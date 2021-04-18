import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../models/user.model';
import { FirebaseStorageService } from './firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({ providedIn: 'root' })
export class AccountService {


    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public userImage = "../assets/user.png";
    constructor(
        private router: Router,
        private firestore : AngularFirestore,
        private firebaseStorage : FirebaseStorageService,
        private angularFireStore : AngularFireStorage
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    setUserFavorites(userFavorites: string) {
        this.userValue.favorites = userFavorites
        this.firestore.collection('users').doc(this.userValue.email).set(this.userValue)
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['']);
    }

    registerUser(user :User, image : File){
        const userFilled = this.fillUserInformation(user)
        this.firestore.collection('users').doc(userFilled.email).get().subscribe(data =>{
            if(!data.exists){
                this.firestore.collection('users').doc(userFilled.email).set(userFilled)
                var imageRef = this.angularFireStore.ref(`users/${user.email}`)
                this.firebaseStorage.uploadUserImage(image,user.email).pipe(
                    finalize(()=>{
                      imageRef.getDownloadURL().subscribe((url) =>{
                        userFilled.image = url
                      })
                    })
                  ).subscribe()
                localStorage.setItem('user', JSON.stringify(userFilled));
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
                    this.firebaseStorage.getUrlPath(`users/${userEmail}`).subscribe(image => {
                        user.image = image
                      })
                    localStorage.setItem('user', JSON.stringify(user));
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

    getUserReview(email: string) {
        return this.firestore.collection("users").doc(email).collection("reseñas").snapshotChanges()
    }

    private fillUserInformation(body){
        let user = {
            email: body.email,
            image : body.image,
            name : body.name,
            password : body.password,
            surname: body.surname,
            tlf: body.tlf
        }
        return user;

    }
}