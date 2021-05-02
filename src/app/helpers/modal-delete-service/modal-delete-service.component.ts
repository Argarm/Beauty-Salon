import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Service } from '../models/establishment.model';

@Component({
  selector: 'app-modal-delete-service',
  templateUrl: './modal-delete-service.component.html',
  styleUrls: ['./modal-delete-service.component.css']
})
export class ModalDeleteServiceComponent implements OnInit {
  @Input() initialState;
  service : Service;
  onClose : Subject<any>;
  constructor(public modalService: BsModalService) { 
    this.onClose = new Subject();
  }

  ngOnInit(): void {
    this.service = this.initialState.service

  }

  delete(){
    this.onClose.next(true)
    this.modalService.hide()
  }

}
