import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../helpers/models/user.model';
import { AccountService } from '../helpers/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  userProfilePicture ;

  options = [
    {name : 'Reservas', router: "/perfil"},
    {name: 'Reseñas', router: "/perfil/reseñas"},
    {name:'Compras', router: "/perfil/compras"},
    {name: 'Favoritos', router: "/perfil/favoritos"}
  ]
  constructor(private accountService : AccountService,private router : Router) { 
    this.user = this.accountService.userValue
    this.userProfilePicture = this.accountService.userImage
  }

  ngOnInit(): void {
  }
  
  isThisTabSelected(){
    console.log("no")
  }
  navigate($event){
    console.log($event)
    this.router.navigate([])
  }
  logout(){
    this.accountService.logout()
  }

}
