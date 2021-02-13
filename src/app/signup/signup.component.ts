import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }
  onSubmit(){}
}
