import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-add-service',
  templateUrl: './modal-add-service.component.html',
  styleUrls: ['./modal-add-service.component.css']
})
export class ModalAddServiceComponent implements OnInit {
  @Input() initialState
  message;
  form: FormGroup;
  submitted : boolean;
  categorys
  newCategory : boolean = false
  constructor(public modalService: BsModalService,private formBuilder : FormBuilder) {
  
  }

  ngOnInit(): void {
    this.message = this.initialState.message
    this.form = this.formBuilder.group({
      categorys : ['',Validators.required],
      name : ['', Validators.required],
      price: ['', Validators.required],
      duration : ['', [Validators.required]],
    })
    this.categorys = this.getCategorys()
  }

  getCategorys(): string[] {
    var result = []
    for ( let key in this.initialState.categorys){
      result.push(key)
    }
    result.push("Nueva Categoria")
    return result
  }

  onChange(deviceValue) {
    if(deviceValue =="Nueva Categoria")this.newCategory = true
    else this.newCategory=false
  }
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true
    console.log("submitted")
  }

}
