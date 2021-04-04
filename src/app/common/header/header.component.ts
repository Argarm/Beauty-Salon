import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../helpers/models/user.model';
import { AccountService } from '../../helpers/services/account.service';
import { environment } from 'src/environments/environment';

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
  private userImgUrl = this.accountService.userImage;
  
  constructor(private router : Router,private accountService : AccountService) { 
    this.userLogged = false
  }

  servicios :string [];

  ngOnInit(): void {
    this.servicios = environment.services
    this.user = this.accountService.userSubject.subscribe((user : User) => {
      this.userLogged = user ? true : false;
    })

        
  }

  ngOnChanges(changes: SimpleChanges) {
   console.log("aqui")
  }

  clearAll(){
    console.log(this.accountService.userImage)
  }

  goToService(servicio : string){
    this.router.navigate(['servicios',servicio.toLowerCase()])
  }

}
