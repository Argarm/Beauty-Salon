import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';



@Injectable({ providedIn: 'root' })
export class AccountService {
    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private validUser : boolean;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private firestore : AngularFirestore
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.validUser = true;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
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

    getServices(id : string){
        var service = environment.services[id].toLowerCase()

        return this.firestore.collection(service).snapshotChanges()
    }
    
    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
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