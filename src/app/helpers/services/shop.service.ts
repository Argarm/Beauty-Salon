import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }
  private actualDocument : number;
  private actualCollection : number;





  setObject(collection : number, document : number){
    this.actualCollection = collection;
    this.actualDocument = document;
  }

  getDocument(){
    return this.actualDocument;
  }

  getCollection(){
    return this.actualCollection;
  }
}
