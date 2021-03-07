import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour } from 'date-fns';
import { concatMap } from 'rxjs/operators';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Service } from 'src/app/models/service.model';

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

  weekStartsOn = DAYS_OF_WEEK.MONDAY

  todaySchedule = {
    isOpen : false,
    dayStart : 0,
    dayEnd : 0
  };
  actualService: Service;
  
  constructor(private cdr: ChangeDetectorRef, private accountService: AccountService, private shopService : ShopService) {
  }

  ngAfterViewInit() {
    this.scrollToCurrentView();
    var collection = this.shopService.getCollection();
    var document = this.shopService.getDocument();
    this.accountService.getService(collection,document).subscribe((serviceSnapshot) => {
      this.actualService = <Service>serviceSnapshot.data()
    });
  }

  private fillInformation( service: Service) {
    var schedule = service.schedule.split('/').map(function(item){
      item = item.trim()
      var day = {
        isOpen : true,
        dayStart: 0,
        dayEnd: 0 
      }

      if(item.indexOf("-")===-1){
        day.isOpen=false
      }else{
        var todaySchedule = item.split(" ")[1].split("-")
        var todayStart = todaySchedule[0].split(":")[0]
        var todayEnd = todaySchedule[1].split(":")[0]
        day.dayStart = Number(todayStart)
        day.dayEnd = Number(todayEnd)
        day.isOpen = true
      }
      return day
    })
    var today = (this.viewDate.getDay()+6)% 7
    this.setTodaySchedule(schedule, today) 
  }

  setTodaySchedule(schedule: { isOpen: boolean; dayStart: number; dayEnd: number; }[], today: number) {
    this.todaySchedule = schedule[today]
  }

  viewChanged() {  
    this.cdr.detectChanges();
    this.fillInformation(this.actualService)
    console.log(this.todaySchedule)
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
