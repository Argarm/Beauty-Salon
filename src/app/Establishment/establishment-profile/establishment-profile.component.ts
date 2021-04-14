import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeAccents } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css']
})
export class EstablishmentProfileComponent implements OnInit {
  establishmentProfilePicture ;
  options = [
    {name: 'Citas', active : false},
    {name: 'Empleados', active : false},
    {name: 'Servicios y productos',  active : false},
    {name: 'Estadísticas', active : false}
  ]

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navigate($event){
    var routing = $event.heading.toLowerCase().replace(/\s/g,"-")

    if(routing == 'citas')routing=''
    
    this.router.navigate([`perfil-establecimiento/${routing}`])
  }

  removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }
}
