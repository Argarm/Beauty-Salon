import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Service } from 'src/app/helpers/models/establishment.model';
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

  getAllCommentsForEstablisment() {
    return this.firestore.collection(this.actualCollection).doc(this.actualDocument).collection("reseñas").get()
  }

  getAllCommentsForEstablismentWithCollectionAndDoc(collection, doc) {
    doc = doc.toLowerCase().replace(/\s/g,"_")
    return this.firestore.collection(collection).doc(doc).collection("reseñas").get()
  }

  setCommentsForEstablisment(comments: any []){
    comments.forEach(comment =>{
      this.firestore.collection(this.actualCollection).doc(this.actualDocument).collection("reseñas").doc(`${comment.userEmail}-${comment.date}`).set(comment)
    })
  }

  setCommentForUser(comment){
    this.firestore.collection("users").doc(comment.userEmail).collection("reseñas").doc(`${this.actualDocument}-${comment.date}`).set(comment)
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
