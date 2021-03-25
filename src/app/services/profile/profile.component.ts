import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Establishments } from 'src/app/models/service.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ServiceProfileComponent implements OnInit {

  actualService : Establishments = {
    name: "",
    rating: "",
    schedule: [],
    street: "",
    tlf: "",
    image: "",
    services : []
  };
  constructor(private route : ActivatedRoute, private shopService : ShopService, private accountService : AccountService, private router: Router) { 
    this.route.params.subscribe(_ => {
      var doc = this.shopService.getDocument()
      var collection = this.shopService.getCollection()
      this.accountService.getEstablishment(collection,doc).subscribe((serviceSnapshot) => {
        this.actualService = <Establishments>serviceSnapshot.data()
      })
    })
  }

  removeAccents(cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }

  book(id :string){
    var name = this.normaliceName(id)
    var serviceNormalized= this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setActualEstablisment(serviceNormalized,name)
    this.router.navigate([`reservar`],{relativeTo: this.route})
  }

  
  ngOnInit(): void {
    
  }
  
  private normaliceName(name : string){
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
