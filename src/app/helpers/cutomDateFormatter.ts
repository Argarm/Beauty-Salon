import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { CalendarNativeDateFormatter, DateFormatterParams } from "angular-calendar";

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('es', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

}