import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Establishments, Service } from 'src/app/helpers/models/service.model';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  pastBookings = [] ;
  nextBookings = [] ;

  constructor(private accounntService : AccountService) { 
    this.accounntService.getUserBookings().subscribe((userBookings) =>{
      userBookings.docs.forEach(userBookingData =>{
        this.preProcessData(userBookingData.data())
      })
    })
  }

  ngOnInit(): void {
  }
  
  private preProcessData(data: any) {
    console.log(data)
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
