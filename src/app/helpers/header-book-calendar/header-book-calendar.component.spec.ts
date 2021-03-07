import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBookCalendarComponent } from './header-book-calendar.component';

describe('HeaderBookCalendarComponent', () => {
  let component: HeaderBookCalendarComponent;
  let fixture: ComponentFixture<HeaderBookCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBookCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBookCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
