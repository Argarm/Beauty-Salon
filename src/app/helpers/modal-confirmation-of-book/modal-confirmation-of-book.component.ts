import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Service } from 'src/app/helpers/models/service.model';
import { User } from 'src/app/helpers/models/user.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-modal-confirmation-of-book',
  templateUrl: './modal-confirmation-of-book.component.html',
  styleUrls: ['./modal-confirmation-of-book.component.css']
})
export class ModalConfirmationOfBookComponent implements OnInit {
  @Input() initialState
  modalRef: BsModalRef;
  user : User;
  service :Service;
  globalService: string;
  establismentName : string;
  reservationDay: string;
  reservationHour : string; 
  constructor(public modalService: BsModalService,private router : Router,private reservationService : ReservationService) {
    
   }

  ngOnInit(): void {
    this.service = this.initialState.service
    this.user = this.initialState.user
    this.reservationDay = this.getDay(this.initialState.date)
    this.reservationHour = this.getHour(this.initialState.date)
    this.globalService = this.initialState.globalService,
    this.establismentName = this.initialState.establismentName
  }


  getHour(date: Date): string {
    let hour = this.checkTime(date.getHours())
    let minutes = this.checkTime(date.getMinutes())
    console.log(date.getMinutes())
    var fullHour =`${hour}:${minutes}`
    return fullHour; 
  }
  
  
  getDay(date: Date): string {
    let day = this.checkTime(date.getDate())
    let month = this.checkTime(date.getMonth() + 1)
    let year = date.getFullYear()
    var fullDate =`${day}-${month}-${year}` 
    return fullDate
  }

  checkTime(i: number) {
    return (i < 10) ? "0" + i : i;
  }
  confirmar(){
    this.reservationService.storeNewReservation(this.user,this.globalService,this.establismentName,this.reservationDay,this.reservationHour,this.service)
    this.modalService.hide()
    this.router.navigate([""])
  }
}
