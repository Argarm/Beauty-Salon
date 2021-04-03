import { Component, OnInit } from '@angular/core';
import { User } from '../helpers/models/user.model';
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
    {name : 'Reservas', router: "/perfil"},
    {name: 'Reseñas', router: "/perfil/reseñas"},
    {name:'Compras', router: "/perfil/compras"},
    {name: 'Favoritos', router: "/perfil/favoritos"}
  ]
  constructor(private accountService : AccountService) { 
    this.user = this.accountService.userValue
  }

  ngOnInit(): void {
  }
  
  logout(){
    this.accountService.logout()
  }

}
