import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Service } from 'src/app/helpers/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }
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
