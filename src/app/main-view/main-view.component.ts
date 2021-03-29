import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmationOfBookComponent } from '../helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { Service } from '../helpers/models/service.model';
import { User } from '../helpers/models/user.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(){
    var service : Service = {
      name : "Hombre - Corte en seco",
      price : "7 €",
      time : "30 minutos"
    };
    var user : User = {
      email : "aa@aa.com",
      image : "",
      name : "aa",
      password : "12341234",
      surname : "bb",
      tlf : "123412341",
      id : "aa@aa.com",
      token : ""

    }
    var initialState = {
      user : user,
      service : service,
      globalService : "peluqueria",
      date : new Date(),
      establismentName : "EVA Peluqueros"
    }
    this.modalRef = this.modalService.show(ModalConfirmationOfBookComponent,{initialState: {initialState}, backdrop: "static",keyboard: false});
  }

}
