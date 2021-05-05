import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalAddServiceComponent } from 'src/app/helpers/modal-add-service/modal-add-service.component';
import { ModalDeleteServiceComponent } from 'src/app/helpers/modal-delete-service/modal-delete-service.component';
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
  constructor(private firebaseStorage: FirebaseStorageService, private shopService : ShopService, private modalService: BsModalService,private establishmentAccount : EstablishmentAccountService) {
    var establishmentPreprocessed;
    this.establishmentAccount.establishment.subscribe(x => {
      establishmentPreprocessed = x
    })
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
    var initialState = {
      categorys : this.categorys,
      establishment : this.establishment,
      category : "",
      name : "",
      price : "",
      duration : ""
    }
    this.modalRef = this.modalService.show(ModalAddServiceComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
    this.modalRef.content.onClose.subscribe(result =>{
      this.establishment.services.push(result)
      this.categorys = this.getServiceCategorys(this.establishment.services) 
    })
  }
  editService(servicio){
    console.log(servicio)
    var initialState = {
      categorys : this.categorys,
      establishment : this.establishment,
      category : servicio.category,
      name : servicio.name,
      price : servicio.price,
      duration : servicio.time
    }
    this.modalRef = this.modalService.show(ModalAddServiceComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
    this.modalRef.content.onClose.subscribe(result =>{
      console.log(result)
      if(result != undefined){
        var condition = this.establishment.services.filter(a =>{
          return a.name == "Hombre - Corte en seco"
        })
        if(condition.length==0){
          this.establishment.services.push(result)
          this.categorys = this.getServiceCategorys(this.establishment.services) 
        }else{
          var services = []
          this.establishment.services.forEach(service =>{
            if(service.name == result.name){
              services.push(result)
            }else{
              services.push(service)
            }
          })
          this.establishment.services = services
          this.categorys = this.getServiceCategorys(this.establishment.services) 
        }
      }

    })
  }

  removeService(servicio){
    var initialState = {
      service : servicio
    }
    this.modalRef = this.modalService.show(ModalDeleteServiceComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
    this.modalRef.content.onClose.subscribe(result =>{
      if(result){
        this.establishment.services = this.establishment.services.filter(service => service.name != servicio.name)
        this.categorys = this.getServiceCategorys(this.establishment.services) 
        this.establishmentAccount.deleteService(this.establishment,servicio.name)
      }

    })
  }

}
