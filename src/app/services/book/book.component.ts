import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
 
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Day;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.scrollToCurrentView();
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }


}
