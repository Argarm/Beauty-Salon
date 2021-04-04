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

  getAllUrlPaths(name : string){
    return this.angularFireStore.ref(name).listAll()
  }

  uploadUserImage(image : File,userName : string){
    return this.angularFireStore.upload(`users/${userName}`,image).snapshotChanges()
  }

}
