import { Component, OnInit } from '@angular/core';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  pastBookings = [] ;
  nextBookings = [] ;
  constructor(private establishmentService : EstablishmentAccountService) {
    this.establishmentService.getEstablishmentBookins().subscribe((establishmentBookings) =>{
      establishmentBookings.forEach(bookin => {
        this.preProcessData(bookin.data())
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
