import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstablishmentAccountService } from 'src/app/helpers/services/establishment-account.service';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-edit-establishment-info',
  templateUrl: './edit-establishment-info.component.html',
  styleUrls: ['./edit-establishment-info.component.css']
})
export class EditEstablishmentInfoComponent implements OnInit {


  form: FormGroup;
  submitted = false;
  loading = false;
  mobNumberPattern="^[0-9]{9}$"
  selectedFile= null;
  establishment
  constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService,
    private router : Router,
    private establishmentAccount : EstablishmentAccountService  ) { }

  ngOnInit(): void {
    var user = this.accountService.userValue
    this.establishmentAccount.establishment.subscribe(x => this.establishment = x)
    this.form = this.formBuilder.group({
      establishmentName : [`${this.establishment.name}`, Validators.required],
      street: [`${this.establishment.street}`, Validators.required],
      tlf : [`${this.establishment.tlf.replace(/\s/g,"")}`, [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      email: [`${user.email}`, [Validators.required,Validators.email]],
    })
  }

  get f() { return this.form.controls; }
  
  onSubmit(){
    this.submitted = true;
    console.log(this.form)
    if(this.form.errors)alert("Las contraseñas deben coincidir")
    if(this.form.invalid)return;
    this.establishmentAccount.updateEstablismentInfo(this.form.value, this.selectedFile)
    this.router.navigate([`perfil-establecimiento`])
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }
}
