import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmationOfBookComponent } from '../../helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { Service } from '../../helpers/models/service.model';
import { User } from '../../helpers/models/user.model';
import { AccountService } from '../../helpers/services/account.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
  }
  
  quitar(){
    this.accountService.logingUser("aa@aa.com","12341234")
  }
}