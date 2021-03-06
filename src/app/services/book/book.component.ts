import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  actualService : Service = {
    name: "",
    rating: "",
    schedule: "",
    street: "",
    tlf: ""
  };
  constructor(private route : ActivatedRoute, private shopService : ShopService, private accountService : AccountService) { 
    this.route.params.subscribe(_ => {
      var doc = this.shopService.getDocument()
      var collection = this.shopService.getCollection()
      this.accountService.getService(collection,doc).subscribe((serviceSnapshot) => {
        this.actualService = <Service>serviceSnapshot.data()
        
      })
    })
  }

  ngOnInit(): void {
  }


}
