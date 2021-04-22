import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ActionSequence } from 'protractor';
import { User } from '../../helpers/models/user.model';
import { AccountService } from '../../helpers/services/user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  userProfilePicture ="../../../assets/user.png";
  ImEditing : boolean;
  options = [
    {name: 'Reservas', router: "/perfil", active : false},
    {name: 'Favoritos', router: "/perfil/favoritos", active : false},
    {name: 'Compras', router: "/perfil/compras", active : false},
    {name: 'Reseñas', router: "/perfil/reseñas", active : false}
  ]

  constructor(private accountService : AccountService,private router : Router , private route : ActivatedRoute) { 
    this.user = this.accountService.userValue
    this.accountService.userSubject.subscribe(data=> {
      this.userProfilePicture = data.image
      this.ngOnInit()
    })
    this.router.events.subscribe((val : any)=>{
      if(val instanceof NavigationEnd){
        this.ImEditing = val.url.indexOf("editar") != -1
        this.options.forEach(option => {
          if(option.router == val.url.replace("rese%C3%B1as","reseñas"))option.active = true
          else option.active = false;
        })
      }

    })
  }

  ngOnInit(): void {}
  
  navigate($event){
    var routing = $event.heading.toLowerCase()
    if(routing == 'reservas')routing=''
    this.router.navigate([`perfil/${routing}`])
  }
}
