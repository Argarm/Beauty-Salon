import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;
  mobNumberPattern="^[0-9]{9}$"
  selectedFile= null;

  constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService,
    private router : Router  ) { }

  ngOnInit(): void {
    var user = this.accountService.userValue
    this.form = this.formBuilder.group({
      name : [`${user.name}`, Validators.required],
      surname: [`${user.surname}`, Validators.required],
      tlf : [`${user.tlf}`, [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      email: [`${user.email}`, [Validators.required,Validators.email]],
    })
  }

  get f() { return this.form.controls; }
  
  onSubmit(){
    this.submitted = true;
    if(this.form.errors)alert("Las contraseñas deben coincidir")
    if(this.form.invalid)return;
    this.accountService.updateUserInfo(this.form.value, this.selectedFile)
    this.router.navigate([`perfil`])
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }

}
