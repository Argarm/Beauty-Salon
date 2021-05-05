import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, scheduled } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Booking, Establishment, Service } from '../models/establishment.model';
import { AccountService } from './user-account.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseStorageService } from './firebase-storage.service';

@Injectable({ providedIn: 'root' })
export class EstablishmentAccountService {


    public establishmentSubject: BehaviorSubject<Establishment>;
    public establishment: Observable<Establishment>;
    constructor(
        private router: Router,
        private firestore: AngularFirestore,
        private accountService: AccountService,
        private firebaseStorage: FirebaseStorageService) {
        this.establishmentSubject = new BehaviorSubject<Establishment>(JSON.parse(localStorage.getItem('establishment')));
        this.establishment = this.establishmentSubject.asObservable();
    }

    public get establishmentValue(): Establishment {
        return this.establishmentSubject.value;
    }


    logoutEstablishment() {
        localStorage.removeItem('establishment');
        this.establishmentSubject.next(null);
        this.router.navigate([''])
    }
    addEstablishment(value: any, schedule: any, selectedFile: any) {
        var establishment = {
            name: value.establishmentName,
            street: value.street,
            tlf: value.tlf,
            rating: Math.random() * (5),
            schedule: schedule
        }
        var collection = this.removeAccents(value.mainService).toLowerCase()
        var establishmentId = value.establishmentName.toLowerCase().replace(/\s/g, "_")


        this.firestore.collection(collection.toLowerCase()).doc(establishmentId).set(establishment)
        this.firebaseStorage.uploadEstablishmentImage(selectedFile, `${collection.toLowerCase()}/${establishmentId}/showcase.jpg`).subscribe()
        var user = this.accountService.userValue
        user.establishmentManager = establishmentId
        this.firestore.collection('users').doc(this.accountService.userValue.email).set(user)
        localStorage.setItem('user', JSON.stringify(user));
        this.accountService.userSubject.next(user);
        var info = {
            mainService: collection.toLowerCase(),
            manager: this.accountService.userValue.email
        }
        this.firestore.collection('establishmentManagement').doc(establishmentId).set(info)
        this.logingEstablishmentFromManager()

    }

    removeAccents(cadena) {
        const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
        return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
    }

    logingEstablishmentFromManager() {
        var establishmentInfo: Establishment = {
            name: "",
            rating: "",
            schedule: [],
            street: "",
            tlf: "",
            mainService: "",
            image: [],
            isUserFavorite: false,
            services: [],
            bookings: []
        };
        var mainService;
        var establishmentServiceName = this.accountService.userValue.establishmentManager
        this.firestore.collection('establishmentManagement').doc(establishmentServiceName).get().subscribe((category: any) => {
            mainService = category.data().mainService
            this.accountService.getEstablishment(mainService, establishmentServiceName).subscribe(establishment => {
                establishmentInfo = <Establishment>establishment.data()
                establishmentInfo.mainService = mainService
                this.accountService.getServices(mainService, establishmentServiceName).subscribe(service => {
                    establishmentInfo.services = service.map(data => <Service>data.payload.doc.data())
                    this.accountService.getEstablishmentBookings(mainService, establishmentServiceName).subscribe(bookins => {
                        establishmentInfo.bookings = []
                        bookins.forEach(data => establishmentInfo.bookings.push(<Booking>data.data()))
                        localStorage.setItem('establishment', JSON.stringify(establishmentInfo));
                        this.establishmentSubject.next(establishmentInfo)
                    })
                })
            })
        })
    }
    setEstablishmentCategory(establishment, serviceData) {
        var establishmentId = establishment.name.replace(/\s/g, "_").toLowerCase()
        serviceData.time = this.parseServiceDataTime(serviceData.time)
        serviceData.price = this.parseServiceDataPrice(serviceData.price)
        console.log(serviceData.time)
        this.firestore.collection(establishment.mainService).doc(establishmentId).collection("servicios").doc(serviceData.name).set(serviceData)
        establishment = JSON.parse(window.localStorage.getItem('establishment'))
        establishment.services.push(serviceData)
        localStorage.setItem('establishment', JSON.stringify(establishment));
        this.establishmentSubject.next(establishment)

    }

    updateEstablismentInfo(value: any, selectedFile: any) {
        console.log(this.establishmentValue.name)
        var establishment = {
            name: "",
            street: "",
            tlf: "",
            rating: "",
            schedule: ""
        };
        establishment.name = this.establishmentValue.name
        this.establishmentValue.street = value.street
        establishment.street = value.street
        this.establishmentValue.tlf = value.tlf
        establishment.tlf = value.tlf
        establishment.rating = this.establishmentValue.rating
        establishment.schedule = this.parseScheduleToString(this.establishmentValue.schedule)
        var establishmentId = establishment.name.replace(/\s/g, "_").toLowerCase()
        this.firestore.collection(this.establishmentValue.mainService).doc(establishmentId).get().subscribe(data => {
            this.firestore.collection(this.establishmentValue.mainService).doc(establishmentId).set(establishment)
            if (selectedFile) {
                this.firebaseStorage.uploadEstablishmentImage(selectedFile, `${this.establishmentValue.mainService}/${establishmentId}/showcase.jpg`).subscribe()
            }
            localStorage.setItem('establishment', JSON.stringify(this.establishmentValue));
            this.establishmentSubject.next(this.establishmentValue);
        })
    }
    parseScheduleToString(schedule: any): string {
        return schedule
    }

    deleteService(establishment, name: any) {
        var establishmentId = establishment.name.replace(/\s/g, "_").toLowerCase()
        this.firestore.collection(establishment.mainService).doc(establishmentId).collection("servicios").doc(name).delete().then()
    }

    getEstablishmentBookins() {
        var collection = this.establishmentValue.mainService
        var doc = this.establishmentValue.name.replace(/\s/g,"_").toLowerCase()
        return this.firestore.collection(collection).doc(doc).collection("reservas").get()
    }

    private parseServiceDataPrice(price: any): any {
        return `${price} €`
    }
    private parseServiceDataTime(time: any): any {
        var hours = time.split(":")[0]
        var minutes = time.split(":")[1]
        if (hours == "00") hours = ""
        if (hours != "01" && hours != "") hours = `${hours} horas`
        if (hours == "01") hours = `${hours} hora`
        if (minutes != "00") minutes = `${minutes} minutos`
        else minutes = ""
        return `${hours.substring(1, hours.length)} ${minutes}`.trim()

    }
}