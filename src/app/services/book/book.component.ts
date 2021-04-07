import { ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView, CalendarEvent, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';
import { differenceInMinutes, startOfDay, startOfHour, addMinutes } from 'date-fns';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { CustomDateFormatter } from 'src/app/helpers/cutomDateFormatter';
import { ModalConfirmationOfBookComponent } from 'src/app/helpers/modal-confirmation-of-book/modal-confirmation-of-book.component';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ShopService } from 'src/app/helpers/services/shop.service';
import { Establishments, Service } from 'src/app/helpers/models/service.model';
import { User } from 'src/app/helpers/models/user.model';
import { environment } from 'src/environments/environment';
import { tr } from 'date-fns/locale';

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

  events: CalendarEvent[] = [];

  eventCreated: boolean = false;

  weekStartsOn = DAYS_OF_WEEK.MONDAY

  restImgUrl = "../../../assets/rest.png"

  todaySchedule = {
    isOpen: true,
    dayStart: 0,
    dayEnd: 0
  };
  actualEstablisment: Establishments;
  serviceStart: Date;

  constructor(private cdr: ChangeDetectorRef, private accountService: AccountService, private shopService: ShopService, private modalService: BsModalService) { }

  ngAfterViewInit() {
    this.scrollToCurrentView();
    var collection = this.shopService.getCollection();
    var document = this.shopService.getDocument();
    this.accountService.getEstablishment(collection, document).subscribe((serviceSnapshot) => {
      this.actualEstablisment = this.preprocessData(serviceSnapshot.data())
      this.fillInformation(this.actualEstablisment)
    });
    this.accountService.getEstablishmentBookings(collection,document).subscribe((establishmentsBookings) => {
      establishmentsBookings.forEach((booking)=>{
        this.processBookInformation(booking.data());
      })
    })
  }
  private processBookInformation(data: any) {
    var eventTittle;
    var color;

    if(data.user !== this.accountService.userValue.email){
      eventTittle = "Ocupado"
    }else{
      eventTittle = data.serviceName
    }
    var event_start = this.parseDateFromString(data.reservationDate);
    var duration = this.getTimeInMinutes(data.duration)
    var event_finished = addMinutes(event_start, duration);
    color = environment.colors.red

    this.events = [
      ...this.events,
      {
        title: eventTittle,
        start: event_start,
        end: event_finished,
        color: color,
        draggable: false,
      },
    ];
  }

  parseDateFromString(reservationDate: any) {
    var bookDay = reservationDate.split(" ")[0]
    var day = bookDay.split("-")[0];
    var month = bookDay.split("-")[1]-1;
    var year = bookDay.split("-")[2];
    var time = reservationDate.split(" ")[1]
    var hour = time.split(":")[0];
    var minutes = time.split(":")[1];
    return new Date(year,month,day,hour,minutes)
  }

  setTodaySchedule(schedule: { isOpen: boolean; dayStart: number; dayEnd: number; }[], today: number) {
    this.todaySchedule = schedule[today]
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.fillInformation(this.actualEstablisment)
    this.scrollToCurrentView();
  }

  eventClicked(event) {
    var service = this.shopService.getService()
    var duration = this.getTimeInMinutes(service.time)
    if (this.checkValidEvent(event, duration)) {
      this.serviceStart = event.date
      var eventTittle = service.name
      if (!this.eventCreated) {
        var event_start = event.date
        var event_finished = addMinutes(event_start, duration)

        this.events = [
          ...this.events,
          {
            title: eventTittle,
            start: event_start,
            end: event_finished,
            color: environment.colors.blue,
            draggable: true,
          },
        ];
        this.eventCreated = true;
      }
    }
  }

  checkValidEvent(event: any, duration: number) {
    var estimateEndOfEvent = addMinutes(event.date, duration)
    if (event.date < new Date() || estimateEndOfEvent.getHours() > this.todaySchedule.dayEnd) {
      alert("No vamos a poder atenderle a esa hora")
      return false
    }
    return true;
  }

  getTimeInMinutes(time: string) {
    if (time.split(" ").length > 2) {
      var hours = +time.split(" ")[0]
      var minutes = +time.split(" ")[2]
      return hours * 60 + minutes
    } else {
      if(time.split(" ")[1].indexOf("ho")!= -1)return 60*+time.split(" ")[0]
      return +time.split(" ")[0]
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {

    if (this.canMoveEvent(newStart,newEnd)) {
      this.events = this.events.map((iEvent) => {
        this.serviceStart = newStart
        if (iEvent === event) {

          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
    }else{
      alert("No vamos a poder atenderle a esa hora")
    }
  }

  private canMoveEvent(newStart: Date, newEnd: Date) {
    var nextEvents = this.events.filter(element => element.start > new Date())
    return nextEvents.every((event) => newStart < event.start && newEnd < event.start)
  }

  openModal() {
    var service: Service = this.shopService.getService();
    var globalService = this.shopService.getCollection();
    var establismentName = this.actualEstablisment.name
    var user: User = this.accountService.userValue
    var initialState = {
      user: user,
      service: service,
      globalService: globalService,
      date: this.serviceStart,
      establismentName: establismentName
    }
    this.modalRef = this.modalService.show(ModalConfirmationOfBookComponent, { initialState: { initialState }, backdrop: "static", keyboard: false });
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

  private fillInformation(establishment: Establishments) {
    var schedule = establishment.schedule.map(function (item) {
      item = item.trim()
      var day = {
        isOpen: true,
        dayStart: 0,
        dayEnd: 0
      }

      if (item.indexOf("-") === -1) {
        day.isOpen = false
      } else {
        var todaySchedule = item.split(" ")[1].split("-")
        var todayStart = todaySchedule[0].split(":")[0]
        var todayEnd = todaySchedule[1].split(":")[0]
        day.dayStart = Number(todayStart)
        day.dayEnd = Number(todayEnd) - 1
        day.isOpen = true
      }
      return day
    })
    var today = (this.viewDate.getDay() + 6) % 7
    this.setTodaySchedule(schedule, today)
  }

  preprocessData(rawData: any): Establishments {
    var processedData = rawData;
    processedData.schedule = processedData.schedule.split('/')
    return processedData;
  }
}
