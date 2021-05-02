import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteServiceComponent } from './modal-delete-service.component';

describe('ModalDeleteServiceComponent', () => {
  let component: ModalDeleteServiceComponent;
  let fixture: ComponentFixture<ModalDeleteServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
