import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../helpers/services/account.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceMainName : string;
  services = []
  constructor(private route : ActivatedRoute, private accountService : AccountService) {
    this.route.params.subscribe(val => {
      this.serviceMainName = environment.services[this.route.snapshot.params.id]
      var id = this.route.snapshot.params.id
      this.accountService.getServices(id).subscribe((servicesSnapshot) => {
        this.services = []
        servicesSnapshot.forEach((service : any ) => {
          this.services.push(service.payload.doc.data())
        })
      })
    })
    
   }

  ngOnInit(): void {
    
    
  }

}
