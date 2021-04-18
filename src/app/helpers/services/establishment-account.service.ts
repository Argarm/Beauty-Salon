import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseStorageService } from './firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Booking, Establishment, Service } from '../models/establishment.model';
import { AccountService } from './user-account.service';
@Injectable({ providedIn: 'root' })
export class EstablishmentAccountService {
    
    
    public establishmentSubject: BehaviorSubject<Establishment>;
    public establishment: Observable<Establishment>;
    constructor(
        private router: Router,
        private firestore : AngularFirestore,
        private firebaseStorage : FirebaseStorageService,
        private accountService  : AccountService) {
            this.establishmentSubject = new BehaviorSubject<Establishment>(JSON.parse(localStorage.getItem('establishment')));
            this.establishment = this.establishmentSubject.asObservable();
        }
        
        public get establishmentValue(): Establishment {
            return this.establishmentSubject.value;
        }
        
        logingEstablishment(establishmentId , establishmentPassword){
            
        }
        
        logoutEstablishment(){
            localStorage.removeItem('establishment');
            this.establishmentSubject.next(null);
            this.router.navigate([''])
        }
        
        
        logingEstablishmentFromManager() {
            var establishmentInfo: Establishment = {
                name: "",
                rating: "",
                schedule: [],
                street: "",
                tlf: "",
                image: [],
                isUserFavorite: false,
                services: [],
                bookings: []
              };
            var mainService;
            var establishmentServiceName = this.accountService.userValue.establishmentManager
            this.firestore.collection('establishmentManagement').doc(establishmentServiceName).get().subscribe((category: any) => {
                mainService = category.data().mainService
                this.accountService.getEstablishment(mainService,establishmentServiceName).subscribe(establishment =>{
                    establishmentInfo = <Establishment>establishment.data()
                    this.accountService.getServices(mainService,establishmentServiceName).subscribe(service =>{
                        establishmentInfo.services = service.map(data => <Service>data.payload.doc.data())
                    })
                    this.accountService.getEstablishmentBookings(mainService,establishmentServiceName).subscribe(bookins =>{
                        establishmentInfo.bookings = []
                        bookins.forEach(data => establishmentInfo.bookings.push(<Booking>data.data()))
                    })
                    localStorage.setItem('establishment', JSON.stringify(establishmentInfo));
                    this.establishmentSubject.next(establishmentInfo)
                })
            })
        }

}