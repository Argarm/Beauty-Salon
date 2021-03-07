import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-header-book-calendar',
  templateUrl: './header-book-calendar.component.html',
  styleUrls: ['./header-book-calendar.component.css']
})
export class HeaderBookCalendarComponent {

  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

}
