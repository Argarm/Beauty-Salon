import { Component, MissingTranslationStrategy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { removeAccents } from '@ng-bootstrap/ng-bootstrap/util/util';
import { empty } from 'rxjs';
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
    {name: 'Citas', active : false},
    {name: 'Empleados', active : false},
    {name: 'Servicios y productos',  active : false},
    {name: 'Estadísticas', active : false}
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
      console.log(this.establishment)
    })
    this.manager = this.accountService.userValue
    var mainService;
    this.firestore.collection('establishmentManagement').doc(this.manager.establishmentManager).get().subscribe((category: any) => {
      mainService = category.data().mainService
      console.log(`${mainService}/${this.manager.establishmentManager}`)
      this.firebaseStorage.getAllUrlPaths(`${mainService}/${this.manager.establishmentManager}`).subscribe(urls =>{
        urls.items.forEach(url =>{
          this.firebaseStorage.getUrlPath(url.fullPath).subscribe((image) =>{
            if(image.includes("showcase"))this.establishmentProfilePicture = image
            this.establishmentPictures.push(image)
          })
        })
      });
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
