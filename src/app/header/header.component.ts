import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

const usersKey = 'beauty-salon-user-example';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userLogged: boolean
  constructor(private route : ActivatedRoute) { }

  servicios :string [] = [
    "Peluquerias",
    "Barberias",
    "Uñas",
    "Estetica"
  ]

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params : Params) => {
        this.userLogged = params['userLogged'] === 1 ? true : false;
      }
    )
  }
  showMode(){
    console.log(this.userLogged)
  }
  clearAll(){
    console.log("aqui")
    JSON.parse(localStorage.getItem(usersKey)).clearAll();
  }

}
