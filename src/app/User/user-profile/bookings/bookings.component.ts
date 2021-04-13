import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmationOfDeleteBookComponent } from 'src/app/helpers/modal-confirmation-of-delete-book/modal-confirmation-of-delete-book.component';
import { Establishments, Service } from 'src/app/helpers/models/service.model';
import { AccountService } from 'src/app/helpers/services/user-account.service';
import { ReservationService } from 'src/app/helpers/services/reservation.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  
  pastBookings = [] ;
  nextBookings = [] ;
  modalRef: BsModalRef;
  

  constructor(private accounntService : AccountService, private reservationService : ReservationService, private modalService: BsModalService) { 
    this.accounntService.getUserBookings().subscribe((userBookings) =>{
      userBookings.docs.forEach(userBookingData =>{
        this.preProcessData(userBookingData.data())
      })
    })
  }

  ngOnInit(): void {
  }

  openModal(index : number) {
    var initialState = {
      actualBook : this.nextBookings[index]
    }
    this.modalRef = this.modalService.show(ModalConfirmationOfDeleteBookComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
    this.modalRef.content.onClose.subscribe(result =>{
      if(result){
        this.nextBookings.splice(index,1)
      }
    })
  }
  private preProcessData(data: any) {
    var date = this.parseDateFromString(data.reservationDate)
    if(date < new Date()){
      this.pastBookings.push(data)
    }else{
      this.nextBookings.push(data)
    }
  }

  private parseDateFromString(reservationDate: any) {
    var bookDay = reservationDate.split(" ")[0]
    var day = bookDay.split("-")[0];
    var month = bookDay.split("-")[1]-1;
    var year = bookDay.split("-")[2];
    var time = reservationDate.split(" ")[1]
    var hour = time.split(":")[0];
    var minutes = time.split(":")[1];
    return new Date(year,month,day,hour,minutes)
  }
}
