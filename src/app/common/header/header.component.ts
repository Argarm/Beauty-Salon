import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../helpers/models/user.model';
import { AccountService } from '../../helpers/services/user-account.service';
import { environment } from 'src/environments/environment';
import { Establishment } from 'src/app/helpers/models/establishment.model';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';

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
  brandName : string;
  establishment : Subscription;
  private cartImgUrl = "../assets/shopping-cart.png";
  private chatImgUrl = "../assets/chat-bubble.png";
  private heartImgUrl = "../assets/heart.png";
  private userImgUrl = "../assets/user.png";
  private logoutImgUrl = "../assets/log-out.png";
  private viewImgUrl = "../assets/eye-strikethrough.png";
  private viewMode = "user"
  constructor(private router : Router,private accountService : AccountService, private establishmentService : EstablishmentAccountService) { 
    this.userLogged = false
  }

  servicios :string [];

  ngOnInit(): void {
    this.servicios = environment.services
    this.user = this.accountService.userSubject.subscribe((user : User) => {
      this.userLogged = user ? true : false;
      if(this.userLogged){
        this.viewImgUrl = "../assets/eye.png"
        this.brandName = "Brand"
      }
    })
    this.establishment = this.establishmentService.establishmentSubject.subscribe((establishment : Establishment) => {
      console.log(establishment)
    })

        
  }

  logout(){
    this.accountService.logout()
  }

  goToService(servicio : string){
    this.router.navigate(['servicios',servicio.toLowerCase()])
  }

  changeView(){
    if(this.viewMode == "admin"){
      this.viewImgUrl ="../assets/eye.png";
      this.viewMode = "user"
    }else{
      this.viewImgUrl = "../assets/eye-strikethrough.png";
      this.viewMode = "admin"
      this.establishmentService.logingEstablishmentFromManager();
    } 
    
  }

}
