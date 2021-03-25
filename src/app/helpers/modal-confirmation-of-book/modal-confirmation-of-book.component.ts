import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Service } from 'src/app/helpers/models/service.model';
import { User } from 'src/app/helpers/models/user.model';

@Component({
  selector: 'app-modal-confirmation-of-book',
  templateUrl: './modal-confirmation-of-book.component.html',
  styleUrls: ['./modal-confirmation-of-book.component.css']
})
export class ModalConfirmationOfBookComponent implements OnInit {
  @Input() initialState
  modalRef: BsModalRef;
  userName : String;
  service :Service;
  establismentName : String = "Establecimiento de prueba"
  constructor(public modalService: BsModalService,private router : Router) {
    
   }

  ngOnInit(): void {
    this.service = this.initialState.service
    this.userName = this.initialState.name
  }

  confirmar(){
    
    this.modalService.hide()
    this.router.navigate([""])
  }
}
