import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalAddServiceComponent } from 'src/app/helpers/modal-add-service/modal-add-service.component';
import { ModalDeleteServiceComponent } from 'src/app/helpers/modal-delete-service/modal-delete-service.component';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';

@Component({
  selector: 'app-services-and-products',
  templateUrl: './services-and-products.component.html',
  styleUrls: ['./services-and-products.component.css']
})
export class ServicesAndProductsComponent implements OnInit {
  establishment
  categorys : [];
  modalRef: BsModalRef;
  constructor(private establishmentService : EstablishmentAccountService,private modalService: BsModalService) { 
    this.establishment = this.establishmentService.establishmentValue
    this.categorys = this.getServiceCategorys(this.establishment.services)
  }

  ngOnInit(): void {
  }

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
          return a.name == result.name
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
        this.establishmentService.deleteService(this.establishment,servicio.name)
      }

    })
  }

}
