import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseStorageService } from './firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Establishment } from '../models/establishment.model';
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
            this.establishmentSubject.next(null);
            this.router.navigate([''])
        }
        
        
        logingEstablishmentFromManager() {
            var mainService;
            var establishmentServiceName = this.accountService.userValue.establishmentManager
            console.log(establishmentServiceName)
        }

}