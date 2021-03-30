import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../helpers/services/account.service';
import { ShopService } from '../helpers/services/shop.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Establishments, Service } from '../helpers/models/service.model';
import { FirebaseStorageService } from '../helpers/services/firebase-storage.service';

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
    "Nombre",
    "Mejor valorados",
    "Abierto ahora",
    "Para ella",
    "Para él",
  ]
  actualFilter = this.filters[0];

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService, private shopService: ShopService,private firebaseStorage : FirebaseStorageService) {
    this.route.params.subscribe(_ => {
      this.serviceMainName = this.route.snapshot.params.servicio
      this.serviceMainName = this.serviceMainName.charAt(0).toUpperCase() + this.serviceMainName.substr(1).toLowerCase()
      var servicio = this.removeAccents(this.route.snapshot.params.servicio)
      this.accountService.getEstablishments(servicio).subscribe((establismentSnapshot) => {
        this.establishments = []
        establismentSnapshot.forEach((service: any) => {
          var actualEstablisment: Establishments = this.preprocessData(service.payload.doc.data())
          firebaseStorage.getUrlPath(`${servicio}/${service.payload.doc.id}/showcase.jpg`).subscribe(image => {
            actualEstablisment.image = image
          })
          this.accountService.getServices(servicio, service.payload.doc.id).subscribe((establishmentServices) => {
            actualEstablisment.services = establishmentServices.map(data => <Service>data.payload.doc.data())

            this.establishments.push(actualEstablisment)
          })
        })
        this.establishments.sort((a, b) => (b.rating > a.rating) ? 1 : -1)
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
        this.establishments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        break;
        case 1:
        this.establishments.sort((a, b) => (b.rating > a.rating) ? 1 : -1)
        break;
        case 2:
        this.openNow();
        break;
        case 3:
        this.gender();
        break;
        case 4:
        this.gender();
        break;
    }
  }

  private openNow() {

  }

  private gender() {

  }

  ngOnInit(): void {

  }

  book(establisment :string,service: Service) {
    var establishmentName = this.normaliceName(establisment)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setServiceOnEstablisment(serviceNormalized, establishmentName,service)
    this.router.navigate([`${establishmentName}/reservar`], { relativeTo: this.route })
  }

  navigate(name: string) {
    var id = this.establishments.map(e => e.name).indexOf(name);
    name = this.normaliceName(name)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setActualEstablisment(serviceNormalized, name)
    this.router.navigate([`${name}`], { relativeTo: this.route })
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
