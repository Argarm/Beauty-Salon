import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';
import { AccountService } from 'src/app/helpers/services/user-account.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-establishment-signup',
  templateUrl: './establishment-signup.component.html',
  styleUrls: ['./establishment-signup.component.css']
})
export class EstablishmentSignupComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;
  mobNumberPattern="^[0-9]{9}$"
  selectedFile= null;
  establishment
  mainServices = environment.services
  constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService,
    private router : Router,
    private establishmentAccount : EstablishmentAccountService  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      establishmentName : ['', Validators.required],
      mainService: [this.mainServices[0],Validators.required],
      street: ['', Validators.required],
      tlf : ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      mondayFrom: [''],
      mondayTo: [''],
      tuesdayFrom: [''],
      tuesdayTo: [''],
      wednesdayFrom: [''],
      wednesdayTo: [''],
      thursdayFrom: [''],
      thursdayTo: [''],
      fridayFrom: [''],
      fridayTo: [''],
      saturdayFrom: [''],
      saturdayTo: [''],
      sundayFrom: [''],
      sundayTo: [''],
    })
  }


  get f() { return this.form.controls; }
  
  onSubmit(){
    this.submitted = true;
    if(this.checkScheduleErrors(this.form))alert("Compruebe el horario")
    if(this.form.errors)alert("Las contraseñas deben coincidir")
    if(this.selectedFile == undefined){
      alert("Debe adjuntar una foto")
      return
    }
    if(this.form.invalid)return;
    var schedule = this.parseSchedule(this.form)
    this.establishmentAccount.addEstablishment(this.form.value, schedule, this.selectedFile)
    this.router.navigate([""])
  }

  checkScheduleErrors(data: any) : boolean {
    var rawData = data.value
    if(<Date>rawData.mondayFrom < <Date>rawData.mondayTo){
      return false
    }
    if(<Date>rawData.tuesdayFrom < <Date>rawData.tuesdayTo){
      return false
    }
    if(<Date>rawData.wednesdayFrom < <Date>rawData.wednesdayTo){
      return false
    }
    if(<Date>rawData.thursdayFrom < <Date>rawData.thursdayTo){
      return false
    }
    if(<Date>rawData.fridayFrom < <Date>rawData.fridayTo){
      return false
    }
    if(<Date>rawData.saturdayFrom < <Date>rawData.saturdayTo){
      return false
    }
    if(<Date>rawData.sundayFrom < <Date>rawData.sundayTo){
      return false
    }
    return true
  }
  parseSchedule(data : any ) {
    var schedule = ""
    var rawData = data.value

    if(rawData.mondayFrom ==="" || rawData.mondayTo === ""){
      schedule += "L: cerrado / "
    }else{
      schedule += `L: ${rawData.mondayFrom}-${rawData.mondayTo} / `
    }
    if(rawData.tuesdayFrom ===""|| rawData.tuesdayTo === ""){
      schedule += "M: cerrado / "
    }else{
      schedule += `M: ${rawData.tuesdayFrom}-${rawData.tuesdayTo} / `
    }

    if(rawData.wednesdayFrom ===""|| rawData.wednesdayTo === ""){
      schedule += "X: cerrado / "
    }else{
      schedule += `X: ${rawData.wednesdayFrom}-${rawData.wednesdayTo} / `
    }

    if(rawData.thursdayFrom ===""|| rawData.thursdayTo === ""){
      schedule += "J: cerrado / "
    }else{
      schedule += `J: ${rawData.thursdayFrom}-${rawData.thursdayTo} / `
    }

    if(rawData.fridayFrom ===""|| rawData.fridayTo === ""){
      schedule += "V: cerrado / "
    }else{
      schedule += `V: ${rawData.fridayFrom}-${rawData.fridayTo} / `
    }

    if(rawData.saturdayFrom ===""|| rawData.saturdayTo === ""){
      schedule += "S: cerrado / "
    }else{
      schedule += `S: ${rawData.saturdayFrom}-${rawData.saturdayTo} / `
    }

    if(rawData.sundayFrom ==="" || rawData.sundayTo === ""){
      schedule += "D: cerrado"
    }else{
      schedule += `D: ${rawData.sundayFrom}-${rawData.sundayFrom}`
    }
    return schedule
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }
}
