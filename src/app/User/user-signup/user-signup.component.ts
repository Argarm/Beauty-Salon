import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

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
      name : ['', Validators.required],
      surname: ['', Validators.required],
      tlf : ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      repassword: ['',[Validators.required,Validators.minLength(8)]]
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
