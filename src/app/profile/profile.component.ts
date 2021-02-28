import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AccountService } from '../helpers/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  userProfilePicture = "../assets/user.png"

  options = [
    {name : 'Calendario', router: "/profile"},
    {name: 'Reseñas', router: "/profile/review"},
    {name:'Compras', router: "/profile/purchase"},
    {name: 'Favoritos', router: "/profile/favorites"}
  ]
  constructor(private accountService : AccountService) { 
    this.user = this.accountService.userValue
  }

  ngOnInit(): void {
  }

  hola(){
    console.log(this.user.name)
  }
  
  logout(){
    this.accountService.logout()
  }

}
