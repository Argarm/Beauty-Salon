import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalAddServiceComponent } from 'src/app/helpers/modal-add-service/modal-add-service.component';
import { Establishment } from 'src/app/helpers/models/establishment.model';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';
import { FirebaseStorageService } from 'src/app/helpers/services/firebase-storage.service';
import { ShopService } from 'src/app/helpers/services/shop.service';

@Component({
  selector: 'app-edit-establishment-profile',
  templateUrl: './edit-establishment-profile.component.html',
  styleUrls: ['./edit-establishment-profile.component.css']
})
export class EditEstablishmentProfileComponent implements OnInit {
  categorys : [];
  comments : any[] = [];
  establishment : Establishment;
  constructor(private firebaseStorage: FirebaseStorageService, private shopService : ShopService, private modalService: BsModalService) {
    var establishmentPreprocessed = JSON.parse(window.localStorage.getItem('establishment'))
    establishmentPreprocessed.schedule = establishmentPreprocessed.schedule.split('/')
    this.establishment = establishmentPreprocessed
    this.categorys = this.getServiceCategorys(this.establishment.services)
    this.shopService.getAllCommentsForEstablismentWithCollectionAndDoc(this.establishment.mainService,this.establishment.name).subscribe(establishmentComments =>{
      establishmentComments.forEach(comment => {
        this.comments.push(comment.data())
      })
    })
    var name = this.establishment.name.toLocaleLowerCase().replace(/\s/g,"_")
    this.establishment.image = []
    this.firebaseStorage.getAllUrlPaths(`${this.establishment.mainService}/${name}`).subscribe(urls =>{
      urls.items.forEach(url =>{
        this.firebaseStorage.getUrlPath(url.fullPath).subscribe((image) =>{
          this.establishment.image.push(image)
        })
      })
    });
  }
  modalRef: BsModalRef;
  
  ngOnInit(): void {}

  private getServiceCategorys(services : any) {
    var group = services.reduce(function(rv, x) {
      (rv[x["category"]] = rv[x["category"]] || []).push(x);
      return rv;
    }, {});


    return group
  }

  addService(){
    var message="hola"
    var initialState = {
      categorys : this.categorys
    }
    this.modalRef = this.modalService.show(ModalAddServiceComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
  }

}
