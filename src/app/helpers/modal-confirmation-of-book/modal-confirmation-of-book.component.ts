import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirmation-of-book',
  templateUrl: './modal-confirmation-of-book.component.html',
  styleUrls: ['./modal-confirmation-of-book.component.css']
})
export class ModalConfirmationOfBookComponent implements OnInit {
  @Input() initialState
  modalRef: BsModalRef;
  
  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
    console.log(this.initialState.titulo);
  }

}
