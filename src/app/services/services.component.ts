import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private accountService: AccountService, private shopService : ShopService) {
    this.route.params.subscribe(_ => {
      this.serviceMainName = environment.services[this.route.snapshot.params.id]
      var id = this.route.snapshot.params.id
      this.accountService.getServices(id).subscribe((servicesSnapshot) => {
        this.services = []
        servicesSnapshot.forEach((service: any) => {
          this.services.push(service.payload.doc.data())
        })
      })
    })

  }

  ngOnInit(): void {


  }

  hola(id: number) {
    this.shopService.setObject(this.route.snapshot.params.id,id)
  }

}
