import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Booking, Establishment, Service } from '../models/establishment.model';
import { AccountService } from './user-account.service';

@Injectable({ providedIn: 'root' })
export class EstablishmentAccountService {
    
    public establishmentSubject: BehaviorSubject<Establishment>;
    public establishment: Observable<Establishment>;
    constructor(
        private router: Router,
        private firestore : AngularFirestore,
        private accountService  : AccountService) {
            this.establishmentSubject = new BehaviorSubject<Establishment>(JSON.parse(localStorage.getItem('establishment')));
            this.establishment = this.establishmentSubject.asObservable();
        }
        
        public get establishmentValue(): Establishment {
            return this.establishmentSubject.value;
        }
        
        logingEstablishment(){
            
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
                mainService : "",
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
                    establishmentInfo.mainService = mainService
                    this.accountService.getServices(mainService,establishmentServiceName).subscribe(service =>{
                        establishmentInfo.services = service.map(data => <Service>data.payload.doc.data())
                        this.accountService.getEstablishmentBookings(mainService,establishmentServiceName).subscribe(bookins =>{
                            establishmentInfo.bookings = []
                            bookins.forEach(data => establishmentInfo.bookings.push(<Booking>data.data()))
                            localStorage.setItem('establishment', JSON.stringify(establishmentInfo));
                            this.establishmentSubject.next(establishmentInfo)
                        })
                    })
                })
            })
        }
    setEstablishmentCategory(establishment, serviceData){
        var establishmentId = establishment.name.replace(/\s/g,"_").toLowerCase()
        serviceData.time = this.parseServiceDataTime(serviceData.time)
        serviceData.price = this.parseServiceDataPrice(serviceData.price)
        console.log(serviceData.time)
        this.firestore.collection(establishment.mainService).doc(establishmentId).collection("servicios").doc(serviceData.name).set(serviceData)
        establishment = JSON.parse(window.localStorage.getItem('establishment'))
        establishment.services.push(serviceData)
        localStorage.setItem('establishment', JSON.stringify(establishment));
        this.establishmentSubject.next(establishment)

    }

    private parseServiceDataPrice(price: any): any {
        return `${price} €`
    }
    private parseServiceDataTime(time: any): any {
        var hours = time.split(":")[0]
        var minutes = time.split(":")[1]
        if(hours == "00") hours=""
        if(hours != "01" && hours != "") hours = `${hours} horas`
        if(hours == "01") hours = `${hours} hora`
        if(minutes != "00")minutes = `${minutes} minutos`
        else minutes = ""
        return `${hours.substring(1,hours.length)} ${minutes}`.trim()

    }

    deleteService(establishment,name: any) {
        var establishmentId = establishment.name.replace(/\s/g,"_").toLowerCase()
        this.firestore.collection(establishment.mainService).doc(establishmentId).collection("servicios").doc(name).delete().then()
    }
}