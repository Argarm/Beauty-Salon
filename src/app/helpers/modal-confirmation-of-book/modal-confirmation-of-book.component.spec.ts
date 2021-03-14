import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationOfBookComponent } from './modal-confirmation-of-book.component';

describe('ModalConfirmationOfBookComponent', () => {
  let component: ModalConfirmationOfBookComponent;
  let fixture: ComponentFixture<ModalConfirmationOfBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmationOfBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationOfBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
