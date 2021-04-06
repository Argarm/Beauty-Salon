import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Establishments } from 'src/app/helpers/models/service.model';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  establishments = [];
  services = environment.services
  constructor(private accountService : AccountService, private router: Router, private shopService : ShopService ) { 
    this.accountService.userSubject.subscribe(userValue =>{
      var userFavEstablismentsName = userValue.favorites.split("/n ")
      userFavEstablismentsName.forEach(data => {
        if(data.length != 0){
          var serviceMainName = this.formatData(data.split("-")[0])
          var establishmentName = this.formatData(data.split("-")[1])
          serviceMainName = this.removeAccents(serviceMainName)
          this.accountService.getEstablishment(serviceMainName,establishmentName).subscribe((actualEstablisment : any) => {
            var establismentData = actualEstablisment.data()
            establismentData.serviceMainName = data.split("-")[0]
            this.establishments.push(establismentData)
          })
        }
      })
    })
  }

  navigateTo(mainService,establishmentName){
    if(mainService && establishmentName){
      var service = this.formatData(mainService)
      var favEstablishment = this.formatData(establishmentName)
      this.shopService.setActualEstablisment(this.removeAccents(service),favEstablishment)
      this.router.navigate([`/servicios/${service}/${favEstablishment}`])
    }
  }

  private formatData(data: string) {
    return data.toLowerCase().replace(" ","_")
  }

  filterEstablismentByService(service : string ){
    return this.establishments.filter(x  => x.serviceMainName == service)
  }
  private removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }
  ngOnInit(): void {
  }

}
