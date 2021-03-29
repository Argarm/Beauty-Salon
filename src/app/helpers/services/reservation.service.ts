import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Service } from '../models/service.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore : AngularFirestore) { }


  storeNewReservation(user : User, globalService : string, establisment : string, reservationDay : string ,reservationHour : string, service : Service){
    this.storeReservationOnUserProfile(user, globalService, establisment, reservationDay ,reservationHour, service)
    this.storeReservationOnEstablismentProfile(user,globalService,establisment,reservationDay ,reservationHour,service)
    
  }



  private storeReservationOnUserProfile(user : User, globalService : string, establisment : string, reservationDay : string ,reservationHour : string, service : Service){
    var reservationInfo = {
      serviceName : service.name,
      reservationDate : `${reservationDay} ${reservationHour}` ,
      establisment : establisment,
      globalService : globalService,
      duration : service.time
    }
    establisment = this.normaliceName(establisment)
    this.firestore.collection("users").doc(user.id).collection("reservas").doc(`${establisment}-${reservationDay}-${reservationHour}`).set(reservationInfo)
  }

  private storeReservationOnEstablismentProfile(user : User, globalService : string, establisment : string, reservationDay : string ,reservationHour : string, service : Service){
    var reservationInfo = {
      serviceName : service.name,
      reservationDate : `${reservationDay} ${reservationHour}`,
      user : user.email,
      globalService : globalService,
      duration : service.time
    }
    establisment = this.normaliceName(establisment)
    this.firestore.collection(globalService).doc(establisment).collection("reservas").doc(`${user.email}-${reservationDay}-${reservationHour}`).set(reservationInfo)
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
