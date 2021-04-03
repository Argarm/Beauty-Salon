import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';



@Injectable({ providedIn: 'root' })
export class AccountService {

    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private firestore : AngularFirestore
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['']);
    }

    registerUser(user :User){
        const userFilled = this.fillUserInformation(user)
        this.firestore.collection('users').doc(userFilled.email).get().subscribe(data =>{
            if(!data.exists){
                this.firestore.collection('users').doc(userFilled.email).set(userFilled)
                this.userSubject.next(user);
                this.router.navigate(['../'])
            }else{
                alert('El usuario "' + userFilled.email + '" ya está en uso')
            }
        })
    }

    
    logingUser(userEmail , userPassword){
        this.firestore.collection('users').doc(userEmail).get().subscribe(data => {
            if(data.exists){
                var user = data.data() as User
                if(user.password === userPassword){
                    this.userSubject.next(user);
                    this.router.navigate(['../'])
                }else{
                    alert("La contraseña no es correcta")
                }
            }else{
                alert("no se ha encontrado ningun usuario con ese correo")
            }
        })
    }

    getEstablishments(id : string){
        var service = id.toLowerCase()

        return this.firestore.collection(service).snapshotChanges()
    }

    getServices(collection,document){
        var service = collection.toLowerCase()        
        return this.firestore.collection(service).doc(`${document}`).collection('servicios').snapshotChanges()
    }
    getEstablishment(id,document){
        var service = id.toLowerCase()
        return this.firestore.collection(service).doc(`${document}`).get()
    }

    getEstablishmentBookings(collection, document) {
        var service = collection.toLowerCase()
        return this.firestore.collection(service).doc(`${document}`).collection("reservas").get()
    }

    getUserBookings() {
        return this.firestore.collection("users").doc(this.userValue.email).collection("reservas").get()
    }

    private fillUserInformation(body){
        let user = {
            email: body.email,
            image : "",
            name : body.name,
            password : body.password,
            surname: body.surname,
            tlf: body.tlf
        }
        return user;

    }
}