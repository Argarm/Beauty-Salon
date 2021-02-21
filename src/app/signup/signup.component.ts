import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

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

  constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

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
    this.accountService.register(this.form.value)
    .pipe(first()).subscribe({
      next: () => {
        this.router.navigate(['../'])
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
