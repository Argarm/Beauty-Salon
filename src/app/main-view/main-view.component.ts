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
      name : "prueba",
      price : "10 €",
      time : "2 horas"
    };
    var userName = "usuario de prueba"
    var initialState = {
      name : userName,
      service : service
    }
    this.modalRef = this.modalService.show(ModalConfirmationOfBookComponent,{initialState: {initialState}, backdrop: "static",keyboard: false});
  }

}
