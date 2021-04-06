import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Establishments, Service } from 'src/app/helpers/models/service.model';
import { FirebaseStorageService } from 'src/app/helpers/services/firebase-storage.service';
import { flattenDiagnosticMessageText } from 'typescript';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ServiceProfileComponent implements OnInit {

  actualEstablisment: Establishments = {
    name: "",
    rating: "",
    schedule: [],
    street: "",
    tlf: "",
    image: "",
    isUserFavorite: false,
    services: []
  };
  categorys : [];
  images : string [] = [];
  constructor(private route: ActivatedRoute, private shopService: ShopService, private accountService: AccountService, private router: Router,private firebaseStorage : FirebaseStorageService) {
    this.route.params.subscribe(_ => {
      var doc = this.shopService.getDocument()
      var collection = this.shopService.getCollection()
      this.accountService.getEstablishment(collection, doc).subscribe((serviceSnapshot) => {
        this.accountService.getServices(collection, serviceSnapshot.id).subscribe((service) =>{
          this.actualEstablisment.services = service.map(data => <Service>data.payload.doc.data())
          this.categorys = this.getServiceCategorys(this.actualEstablisment.services)
        })
        this.actualEstablisment = this.preprocessData(serviceSnapshot.data())
      })
      this.firebaseStorage.getAllUrlPaths(`${collection}/${doc}`).subscribe(list => {
        list.items.forEach(url =>{
          this.firebaseStorage.getUrlPath(url.fullPath).subscribe((image) =>{
            this.images.push(image)
          })
        })
        
      })
    })
  }

  removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }

  ngOnInit(): void {

  }

  hola(){
    console.log("aquí")
  }

  book(service: Service) {
    var establishmentName = this.normaliceName(this.actualEstablisment.name)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setServiceOnEstablisment(serviceNormalized, establishmentName,service)
    this.router.navigate([`reservar`], { relativeTo: this.route })
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }

  private preprocessData(rawData: any): Establishments {
    var processedData = rawData;
    processedData.schedule = processedData.schedule.split('/')
    return processedData;
  }

  private getServiceCategorys(services : any) {
    var group = services.reduce(function(rv, x) {
      (rv[x["category"]] = rv[x["category"]] || []).push(x);
      return rv;
    }, {});


    return group
  }
}
