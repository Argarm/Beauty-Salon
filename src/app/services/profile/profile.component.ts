import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ServiceProfileComponent implements OnInit {

  actualService : Service = {
    name: "",
    rating: "",
    schedule: "",
    street: "",
    tlf: ""
  };
  constructor(private route : ActivatedRoute, private shopService : ShopService, private accountService : AccountService, private router: Router) { 
    this.route.params.subscribe(_ => {
      var doc = this.shopService.getDocument()
      var collection = this.shopService.getCollection()
      this.accountService.getService(collection,doc).subscribe((serviceSnapshot) => {
        this.actualService = <Service>serviceSnapshot.data()
        
      })
    })
  }

  book(id :string){
    var name = this.normaliceName(id)
    this.shopService.setObject(this.route.snapshot.params.servicio,name)
    this.router.navigate([`reservar`],{relativeTo: this.route})
  }

  
  ngOnInit(): void {
    
  }
  
  private normaliceName(name : string){
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
