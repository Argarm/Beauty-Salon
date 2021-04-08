import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Service } from 'src/app/helpers/models/service.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private firestore : AngularFirestore) { }
  private actualDocument : string;
  private actualCollection : string;
  private service : Service

  setServiceOnEstablisment(collection : string, document : string, service : Service){
    this.actualCollection = collection;
    this.actualDocument = document;
    this.service = service
  }

  setActualEstablisment(collection : string, document : string){
    this.actualCollection = collection;
    this.actualDocument = document;
  }

  setCommentsForEstablisment(comments: any []){
    comments.forEach(comment =>{
      this.firestore.collection(this.actualCollection).doc(this.actualDocument).collection("reseñas").doc(comment.id).set(comment)
    })
  }
  getDocument(){
    return this.actualDocument;
  }

  getCollection(){
    return this.actualCollection;
  }

  getService(){
    return this.service;
  }
}
