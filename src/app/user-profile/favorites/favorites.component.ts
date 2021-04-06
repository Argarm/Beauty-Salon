import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Establishments } from 'src/app/helpers/models/service.model';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  establisments : Establishments[] = [];
  constructor(private accountService : AccountService, private router: Router ) { 
    this.accountService.userSubject.subscribe(userValue =>{
      var userFavEstablismentsName = userValue.favorites.split("/n ")
      userFavEstablismentsName.forEach(data => {
        if(data.length != 0){
          var serviceMainName = this.formatData(data.split("-")[0])
          var establishmentName = this.formatData(data.split("-")[1])
          serviceMainName = this.removeAccents(serviceMainName)
          this.accountService.getEstablishment(serviceMainName,establishmentName).subscribe((actualEstablisment : any) => {
            var establisment = actualEstablisment.data()
            establisment.serviceMainName = data.split("-")[0]
            console.log(establisment)
            this.establisments.push(establisment)
          })
        }
      })
    })
  }

  navigateTo(establishment){
    console.log(establishment)
    //this.router.navigate([`${}`])
  }
  private formatData(data: string) {
    return data.toLowerCase().replace(" ","_")
  }

  private removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }
  ngOnInit(): void {
  }

}
