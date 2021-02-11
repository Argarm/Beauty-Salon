import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  servicios :string [] = [
    "Peluquerias",
    "Tintes",
    "Barberias",
    "Uñas",
    "Item"
  ]

  ngOnInit(): void {
  }
  

}
