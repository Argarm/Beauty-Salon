import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstablishmentProfileComponent } from './edit-establishment-profile.component';

describe('EditEstablishmentProfileComponent', () => {
  let component: EditEstablishmentProfileComponent;
  let fixture: ComponentFixture<EditEstablishmentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstablishmentProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstablishmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
