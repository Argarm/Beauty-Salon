import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { EstablishmentAccountService } from '../services/establishment-account.service';

@Component({
  selector: 'app-modal-add-service',
  templateUrl: './modal-add-service.component.html',
  styleUrls: ['./modal-add-service.component.css']
})
export class ModalAddServiceComponent implements OnInit {
  @Input() initialState
  message;
  form: FormGroup;
  submitted: boolean;
  categorys
  newCategory: boolean = false
  onClose : Subject<any>;
  setToUndefined: boolean;
  constructor(public modalService: BsModalService, private formBuilder: FormBuilder, private establishmentService : EstablishmentAccountService) {
    this.onClose = new Subject();
  }

  ngOnInit(): void {
    var category = this.initialState.category
    var name = this.initialState.name
    var price = parseInt(this.initialState.price.replace("€",""))
    var duration = this.parseTime(this.initialState.duration)
    this.form = this.formBuilder.group({
      categorys: [category, Validators.required],
      name: [name, Validators.required],
      price: [price, Validators.required],
      duration: ["00:01", [Validators.required]],
    })
    this.categorys = this.getCategorys()
  }

  private parseTime(duration: any) {
    var hours = duration.match(/\d+/)[0]
    var minutes = duration.match(/\d+/)[1]
    if(minutes)
    return ""
  }

  getCategorys(): string[] {
    var result = []
    for (let key in this.initialState.categorys) {
      result.push(key)
    }
    result.push("Nueva Categoria")
    return result
  }

  onChange(deviceValue) {
    if (deviceValue == "Nueva Categoria") this.newCategory = true
    else this.newCategory = false
  }
  get f() { return this.form.controls; }

  close(){
    console.log("cerramos")
    this.setToUndefined=true;
    this.modalService.hide()
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid)return;
    var dataInfo = {
      category : this.f.categorys.value,
      name : this.f.name.value,
      price : this.f.price.value,
      time : this.f.duration.value,
    }
    this.establishmentService.setEstablishmentCategory(this.initialState.establishment, dataInfo)
    if(this.setToUndefined)this.onClose.next(undefined)
    else this.onClose.next(dataInfo);
    this.modalService.hide()
  }

}
