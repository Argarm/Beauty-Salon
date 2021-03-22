import { ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour, addMinutes } from 'date-fns';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { CustomDateFormatter } from 'src/app/helpers/cutomDateFormatter';
import { ModalConfirmationOfBookComponent } from 'src/app/helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Establishments } from 'src/app/models/service.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    }
  ]
})
export class BookComponent {
  modalRef: BsModalRef;

  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Day;

  viewDate = new Date()

  events: CalendarEvent[] = [  ];

  eventCreated : boolean = false;

  weekStartsOn = DAYS_OF_WEEK.MONDAY

  restImgUrl="../../../assets/rest.png"

  todaySchedule = {
    isOpen : true,
    dayStart : 0,
    dayEnd : 0
  };
  actualService: Establishments;
  
  constructor(private cdr: ChangeDetectorRef, private accountService: AccountService, private shopService : ShopService,private modalService: BsModalService) {   }

  ngAfterViewInit() {
    this.scrollToCurrentView();
    var collection = this.shopService.getCollection();
    var document = this.shopService.getDocument();
    this.accountService.getEstablishment(collection,document).subscribe((serviceSnapshot) => {
      this.actualService = <Establishments>serviceSnapshot.data()
      this.fillInformation(this.actualService)
    });

  }

  setTodaySchedule(schedule: { isOpen: boolean; dayStart: number; dayEnd: number; }[], today: number) {
    this.todaySchedule = schedule[today]
  }

  viewChanged() {  
    this.cdr.detectChanges();
    this.fillInformation(this.actualService)
    this.scrollToCurrentView();
  }

  eventClicked(event){
    if(!this.eventCreated){
      var event_start = event.date
      var event_finished = addMinutes(event_start,30)

      this.events = [
        ...this.events,
        {
          title: 'New event',
          start: event_start,
          end: event_finished,
          color: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
          },
          draggable: true,
        },
      ];
      this.eventCreated = true;
    } 
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  openModal(){
    const initialState = {
      titulo: "titulo",
      //origen: this.accountService.userValue,
      th1: "Número",
      th2: "Nombres",
      modalFor: "Locales"
    }
    this.modalRef = this.modalService.show(ModalConfirmationOfBookComponent,{initialState: {initialState}, backdrop: "static",keyboard: false});
  }

  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }

  private fillInformation( service: Establishments) {
    var dataProcessed = this.preprocessData(service)
    var schedule = dataProcessed.schedule.map(function(item){
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
        day.dayEnd = Number(todayEnd)-1
        day.isOpen = true
      }
      return day
    })
    var today = (this.viewDate.getDay()+6)% 7
    this.setTodaySchedule(schedule, today) 
  }

  preprocessData(rawData: any): Establishments {
    var processedData = rawData;
    processedData.schedule.split('/')
    return processedData;
  }
}
