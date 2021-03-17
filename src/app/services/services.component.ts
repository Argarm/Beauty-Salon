import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../helpers/services/account.service';
import { ShopService } from '../helpers/services/shop.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class ServicesComponent implements OnInit {
  serviceMainName: string;
  services = []
  filters = [
    "Mejor valorados",
    "Abierto ahora",
    "Para ella",
    "Para él",
    "Nombre"
  ]
  actualFilter = this.filters[0];

  constructor(private route: ActivatedRoute, private router : Router , private accountService: AccountService, private shopService : ShopService,) {
    this.route.params.subscribe(_ => {
      this.serviceMainName = this.route.snapshot.params.servicio
      this.serviceMainName = this.serviceMainName.charAt(0).toUpperCase() + this.serviceMainName.substr(1).toLowerCase()
      var servicio = this.route.snapshot.params.servicio
      this.accountService.getServices(servicio).subscribe((servicesSnapshot) => {
        this.services = []
        servicesSnapshot.forEach((service: any) => {
          this.services.push(service.payload.doc.data())
        })
        //this.services.sort((a,b) => (b.rating>a.rating)? 1: -1)
      })
    })
    
  }

  setFilter(index : number){
    this.actualFilter = this.filters[index]
    switch (index){
      case 0:
        this.services.sort((a,b) => (b.rating>a.rating)? 1: -1)
        break;
      case 1:
        this.openNow();
        break;
      case 2:
        this.gender();
        break;        
      case 3:
        this.gender();
        break;
      case 4:
        this.services.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        break;
    }
  }

  private openNow(){

  }
  private gender(){

  }
  
  ngOnInit(): void {

  }

  book(id: number) {
    var name = this.normaliceName(this.services[id].name)
    this.shopService.setObject(this.route.snapshot.params.servicio,name)
    this.router.navigate([`${name}/reservar`],{relativeTo: this.route})
  }

  navigate(name : string){
    var id = this.services.map(e => e.name).indexOf(name);
    name = this.normaliceName(name)
    this.shopService.setObject(this.route.snapshot.params.servicio,name)
    this.router.navigate([`${name}`],{relativeTo: this.route})
  }

  private normaliceName(name : string){
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
