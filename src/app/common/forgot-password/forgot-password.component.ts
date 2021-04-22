import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/helpers/services/user-account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private accountService : AccountService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', [Validators.required,Validators.email]],
      });
  }

  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid)return;
    this.accountService.retrievePassword(this.f.email.value).subscribe((data : any)=> {
      var message;
      console.log()
      if(data.exists){
        message =`La contraseña para el ususario ${this.f.email.value} es ${data.data().password}`;
      }else{
        message = `El usuario ${this.f.email.value} no está registrado`;
      }
      alert(message)
    })
  }
}
