import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../helpers/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  mobNumberPattern="^[0-9]{9}$"
  selectedFile= null;

  constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['prueba', Validators.required],
      surname: ['texto de prueba', Validators.required],
      tlf : ['123412341', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      email: ['jj@jj.com', [Validators.required,Validators.email]],
      password: ['12341234',[Validators.required,Validators.minLength(8)]],
      repassword: ['12341234',[Validators.required,Validators.minLength(8)]]
    },{validators : this.checkPasswordConfirmation})
  }

  checkPasswordConfirmation(group: FormGroup){
    return group.get('password').value === group.get('repassword').value ? null : {notSame : true}
  }

  get f() { return this.form.controls; }
  
  onSubmit(){
    this.submitted = true;
    if(this.form.errors)alert("Las contraseñas deben coincidir")
    if(this.form.invalid)return;
    this.accountService.registerUser(this.form.value, this.selectedFile)
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  }

}
