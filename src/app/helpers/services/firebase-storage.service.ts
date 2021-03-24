import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private angularFireStore : AngularFireStorage) { }

  getUrlPath(name : string){
    return this.angularFireStore.ref(name).getDownloadURL()
  }
}
