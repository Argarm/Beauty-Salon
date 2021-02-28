import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../helpers/services/account.service';

const usersKey = 'beauty-salon-user-example';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: Subscription
  userLogged : boolean
  
  private cartImgUrl = "../assets/shopping-cart.png";
  private chatImgUrl = "../assets/chat-bubble.png";
  private starImgUrl = "../assets/star.png";
  private userImgUrl = "../assets/user.png";
  
  constructor(private router : Router,private accountService : AccountService) { 
    this.userLogged = false
  }

  servicios :string [] = [
    "Peluquerias",
    "Barberias",
    "Uñas",
    "Estetica"
  ]

  ngOnInit(): void {
    this.user = this.accountService.userSubject.subscribe((user : User) => {
      this.userLogged = user ? true : false;
    })
        
  }
  
  clearAll(){
    localStorage.clear();
  }

  goToService(servicio : string){
    let id = this.servicios.indexOf(servicio)
    this.router.navigate(['services',id])
  }

}
