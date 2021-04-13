import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/user-account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Establishments, Service } from 'src/app/helpers/models/service.model';
import { FirebaseStorageService } from 'src/app/helpers/services/firebase-storage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ServiceProfileComponent implements OnInit {

  actualEstablisment: Establishments = {
    name: "",
    rating: "",
    schedule: [],
    street: "",
    tlf: "",
    image: "",
    isUserFavorite: false,
    services: []
  };
  categorys : [];
  images : string [] = [];
  comments : any[] = []
  commentText : string;

  constructor(private route: ActivatedRoute, private shopService: ShopService, private accountService: AccountService, private router: Router,private firebaseStorage : FirebaseStorageService) {
    this.route.params.subscribe(_ => {
      var doc = this.shopService.getDocument()
      var collection = this.shopService.getCollection()
      this.accountService.getEstablishment(collection, doc).subscribe((serviceSnapshot) => {
        this.accountService.getServices(collection, serviceSnapshot.id).subscribe((service) =>{
          this.actualEstablisment.services = service.map(data => <Service>data.payload.doc.data())
          this.categorys = this.getServiceCategorys(this.actualEstablisment.services)
        })
        this.actualEstablisment = this.preprocessData(serviceSnapshot.data())
      })
      this.firebaseStorage.getAllUrlPaths(`${collection}/${doc}`).subscribe(list => {
        list.items.forEach(url =>{
          this.firebaseStorage.getUrlPath(url.fullPath).subscribe((image) =>{
            this.images.push(image)
          })
        })
        
      })
      this.shopService.getAllCommentsForEstablisment().subscribe(establishmentComments =>{
        establishmentComments.forEach(comment => {
          this.comments.push(comment.data())
        })
      })
    })
  }

  removeAccents(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }

  ngOnInit(): void {

  }

  push(){
    var actualHour = new Date()
    var commentDay = this.getDay(actualHour)
    var commentHour = this.getHour(actualHour)
    var commentDate = `${commentDay}-${commentHour}`
    var commentary = {
      mainService :  this.route.snapshot.params.servicio,
      establishment : this.actualEstablisment.name,
      userName: this.accountService.userValue.name,
      userSurname: this.accountService.userValue.surname,
      userEmail : this.accountService.userValue.email,
      comment : this.commentText,
      image : this.accountService.userValue.image,
      date: commentDate
    }
    this.comments.push(commentary)
    this.shopService.setCommentsForEstablisment(this.comments)
    this.shopService.setCommentForUser(commentary)
    this.commentText =""
  }

  getHour(date: Date): string {
    let hour = this.checkTime(date.getHours())
    let minutes = this.checkTime(date.getMinutes())
    let seconds = this.checkTime(date.getSeconds())
    var fullHour =`${hour}:${minutes}:${seconds}`
    return fullHour; 
  }
  
  
  getDay(date: Date): string {
    let day = this.checkTime(date.getDate())
    let month = this.checkTime(date.getMonth() + 1)
    let year = date.getFullYear()
    var fullDate =`${day}-${month}-${year}` 
    return fullDate
  }

  checkTime(i: number) {
    return (i < 10) ? "0" + i : i;
  }

  book(service: Service) {
    var establishmentName = this.normaliceName(this.actualEstablisment.name)
    var serviceNormalized = this.removeAccents(this.route.snapshot.params.servicio)
    this.shopService.setServiceOnEstablisment(serviceNormalized, establishmentName,service)
    this.router.navigate([`reservar`], { relativeTo: this.route })
  }

  private normaliceName(name: string) {
    var result = name.toLowerCase()
    return result.replace(/\s/g, '_').trim()
  }

  private preprocessData(rawData: any): Establishments {
    var processedData = rawData;
    processedData.schedule = processedData.schedule.split('/')
    return processedData;
  }

  private getServiceCategorys(services : any) {
    var group = services.reduce(function(rv, x) {
      (rv[x["category"]] = rv[x["category"]] || []).push(x);
      return rv;
    }, {});


    return group
  }
}
