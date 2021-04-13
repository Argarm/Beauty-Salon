import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  myComments : any[] = [];

  constructor(private accountService : AccountService,private route : Router) {
    this.accountService.getUserReview(this.accountService.userValue.email).subscribe((reviews) =>{
      reviews.forEach((review) =>{
        this.myComments.push(review.payload.doc.data())
      })
    })
   }

  ngOnInit(): void {
  }

  navigate(comment : any){
    var establishment = comment.establishment.replace(" ","_").toLowerCase()
    this.route.navigate([`/servicios/${comment.mainService}/${establishment}`])
  }
}
