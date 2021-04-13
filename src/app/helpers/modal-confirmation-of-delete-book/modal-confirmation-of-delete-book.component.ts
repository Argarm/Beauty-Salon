import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { BookingsComponent } from 'src/app/user-profile/bookings/bookings.component';
import { AccountService } from '../services/user-account.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-modal-confirmation-of-delete-book',
  templateUrl: './modal-confirmation-of-delete-book.component.html',
  styleUrls: ['./modal-confirmation-of-delete-book.component.css'],
})
export class ModalConfirmationOfDeleteBookComponent implements OnInit {
  @Input() initialState;
  modalRef: BsModalRef;
  onClose : Subject<boolean>
  actualBook;
  constructor(public modalService: BsModalService, private reservationService : ReservationService, private accountService : AccountService) { }

  ngOnInit(): void {
    this.actualBook = this.initialState.actualBook
    this.onClose = new Subject();
  }

  confirm(){
    this.reservationService.removeReservation(this.actualBook, this.accountService.userValue.email);
    this.onClose.next(true);
    this.modalService.hide()

  }

}
