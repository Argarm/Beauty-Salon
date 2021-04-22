import { Component, MissingTranslationStrategy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationEnd } from '@angular/router';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';
import { FirebaseStorageService } from 'src/app/helpers/services/firebase-storage.service';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css']
})
export class EstablishmentProfileComponent implements OnInit {
  establishmentPictures : String[] = [];
  establishmentProfilePicture;
  establishment;
  manager;
  options = [
    {name: 'Citas',router : "/perfil-establecimiento", active : false},
    {name: 'Empleados', router : "/perfil-establecimiento/empleados",active : false},
    {name: 'Servicios y productos', router : "/perfil-establecimiento/servicios-y-productos" ,active : false},
    {name: 'Estadísticas', router : "/perfil-establecimiento/estadísticas",active : false}
  ]

  constructor(
              private router : Router,
              private establishmentAccountService : EstablishmentAccountService,
              private accountService : AccountService,
              private firebaseStorage : FirebaseStorageService,
              private firestore : AngularFirestore) {
    this.establishmentAccountService.logingEstablishmentFromManager();
    this.establishmentAccountService.establishmentSubject.subscribe(establishment => {
      this.establishment = establishment
    })
    this.manager = this.accountService.userValue
    var mainService;
    this.firestore.collection('establishmentManagement').doc(this.manager.establishmentManager).get().subscribe((category: any) => {
      mainService = category.data().mainService
      this.firebaseStorage.getAllUrlPaths(`${mainService}/${this.manager.establishmentManager}`).subscribe(urls =>{
        urls.items.forEach(url =>{
          this.firebaseStorage.getUrlPath(url.fullPath).subscribe((image) =>{
            if(image.includes("showcase"))this.establishmentProfilePicture = image
            this.establishmentPictures.push(image)
          })
        })
      });
    })
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.options.forEach((option:any) => {
          if(option.router == val.url)option.active = true
          else option.active = false;
        })
      }

    })
   }


  ngOnInit(): void {
  }

  navigate($event){
    var routing = $event.heading.toLowerCase().replace(/\s/g,"-")
    if(routing == 'citas')routing=''
    this.router.navigate([`perfil-establecimiento/${routing}`])
  }

  removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }
}
