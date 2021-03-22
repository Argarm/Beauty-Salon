import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../helpers/services/account.service';
import { ShopService } from '../helpers/services/shop.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Establishments, Service } from '../models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class ServicesComponent implements OnInit {
  serviceMainName: string;
  searchText
  establishments: Establishments[] = []
  filters = [
    "Mejor valorados",
    "Abierto ahora",
    "Para ella",
    "Para él",
    "Nombre"
  ]
  actualFilter = this.filters[0];

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService, private shopService: ShopService) {
    this.route.params.subscribe(_ => {
      this.serviceMainName = this.route.snapshot.params.servicio
      this.serviceMainName = this.serviceMainName.charAt(0).toUpperCase() + this.serviceMainName.substr(1).toLowerCase()
      var servicio = this.removeAccents(this.route.snapshot.params.servicio)
      this.accountService.getEstablishments(servicio).subscribe((establismentSnapshot) => {
        this.establishments = []
        establismentSnapshot.forEach((service: any) => {
          var actualEstablisment: Establishments = this.preprocessData(service.payload.doc.data())
          this.accountService.getServices(servicio, service.payload.doc.id).subscribe((establishmentServices) => {
            actualEstablisment.services = establishmentServices.map(data => <Service>data.payload.doc.data())

            this.establishments.push(actualEstablisment)
            console.log(actualEstablisment)
          })
          this.establishments.sort((a, b) => (b.rating > a.rating) ? 1 : -1)
        })
      })

    })
  }
  preprocessData(rawData: any): Establishments {
    var processedData = rawData;
    processedData.schedule = processedData.schedule.split('/')
    return processedData;
  }
  

  removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }

  setFilter(index: number) {
    this.actualFilter = this.filters[index]
    switch (index) {
      case 0:
        this.establishments.sort((a, b) => (b.rating > a.rating) ? 1 : -1)
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
        this.establishments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        break;
    }
  }

  private openNow() {

  }

  private gender() {

  }

  ngOnInit(): void {

  }

  book(id: string) {
    var name = this.normaliceName(id)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setObject(serviceNormalized, name)
    this.router.navigate([`${name}/reservar`], { relativeTo: this.route })
  }

  navigate(name: string) {
    var id = this.establishments.map(e => e.name).indexOf(name);
    name = this.normaliceName(name)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setObject(serviceNormalized, name)
    this.router.navigate([`${name}`], { relativeTo: this.route })
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
