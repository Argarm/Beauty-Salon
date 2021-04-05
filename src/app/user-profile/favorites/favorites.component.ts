import { Component, OnInit } from '@angular/core';
import { Establishments } from 'src/app/helpers/models/service.model';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  establisments : Establishments[];
  constructor(private accountService : AccountService, private shopService : ShopService) { 
    this.accountService.userSubject.subscribe(userValue =>{
      var userFavEstablismentsName = userValue.favorites.split("/n ")
      userFavEstablismentsName.forEach(establismentName => {
        console.log(establismentName)
      })
    })
  }

  ngOnInit(): void {
  }

}
