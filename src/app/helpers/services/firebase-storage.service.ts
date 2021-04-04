import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AccountService } from './account.service';

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

  uploadImage(image : File,userName : string){
    this.angularFireStore.upload(`users/${userName}`,image)
  }

}
