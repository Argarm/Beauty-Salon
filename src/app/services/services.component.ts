import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../helpers/services/account.service';
import { ShopService } from '../helpers/services/shop.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceMainName: string;
  services = []
  constructor(private route: ActivatedRoute, private router : Router , private accountService: AccountService, private shopService : ShopService) {
    this.route.params.subscribe(_ => {
      this.serviceMainName = this.route.snapshot.params.servicio
      this.serviceMainName = this.serviceMainName.charAt(0).toUpperCase() + this.serviceMainName.substr(1).toLowerCase()
      var servicio = this.route.snapshot.params.servicio
      this.accountService.getServices(servicio).subscribe((servicesSnapshot) => {
        this.services = []
        servicesSnapshot.forEach((service: any) => {
          this.services.push(service.payload.doc.data())
        })
      })
    })
    
  }

  ngOnInit(): void {

  }

  book(id: number) {
    this.shopService.setObject(this.route.snapshot.params.servicio,id)
    var name = this.normaliceName(this.services[id].name)
    this.router.navigate([`${name}/reservar`],{relativeTo: this.route})
  }

  navigate(name : string){
    var id = this.services.map(e => e.name).indexOf(name);
    name = this.normaliceName(name)
    this.shopService.setObject(this.route.snapshot.params.servicio,id)
    this.router.navigate([`${name}`],{relativeTo: this.route})
  }

  private normaliceName(name : string){
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
