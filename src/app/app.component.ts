import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beauty-salon';
  images = [
    '../../assets/carousel/barberia.jpg',
    '../../assets/carousel/peluqueria.jpg',
    '../../assets/carousel/uñas.jpg'
  ]
  imagen : string;
  constructor(public router : Router){

  }
}

