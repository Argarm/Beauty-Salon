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

  removeReservation(reservation : any, userEmail : string) {
    this.removeReservationOnProfileUser(reservation,userEmail)
    this.removeReservationOnEstablismentProfile(reservation,userEmail)
  }

  removeReservationOnEstablismentProfile(reservation: any,userEmail) {
    var docName = this.normaliceName(reservation.establisment)
    var collectionDate = this.normaliceDate(reservation.reservationDate)
    var collection = `${userEmail}-${collectionDate}`
    this.firestore.collection(reservation.globalService).doc(docName).collection("reservas").doc(collection).delete()
  }

  removeReservationOnProfileUser(reservation: any, userEmail : string) {
    var collectionName = this.normaliceName(reservation.establisment)
    var collectionDate = this.normaliceDate(reservation.reservationDate)
    var collection = `${collectionName}-${collectionDate}`
    this.firestore.collection("users").doc(userEmail).collection("reservas").doc(collection).delete()
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
    this.firestore.collection("users").doc(user.email).collection("reservas").doc(`${establisment}-${reservationDay}-${reservationHour}`).set(reservationInfo)
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

  private normaliceDate(date : string){
    return date.replace(/\s/g,'-')
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }
}
