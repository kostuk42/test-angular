import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from "@angular/material/datepicker";
import { CalendarEvent } from "../models/models";
import { CalendarService } from "../services/calendar.service";
import { MatDialog } from "@angular/material/dialog";
import { EventModalComponent } from "../event-modal/event-modal.component";
import { Subscription, take } from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(public calendarService: CalendarService,
              public dialog: MatDialog
  ) {
  }

  sub: Subscription
  selectedDate: any
  currentDate: any = new Date();
  @ViewChild('calendar') calendar: MatCalendar<any>

  dateChanged(e: any) {
    this.currentDate = e;
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
    if (!this.sub) {
      this.calendarService.updateEvents$.subscribe(() => this.updateCalendar())
    }
  }

  onEventChanged(events: CalendarEvent[]) {
    events.forEach(e => {
      this.calendarService.totalEvents = this.calendarService.totalEvents
        .map(totalEvent => totalEvent.id === e.id ? e : totalEvent)
    });
  }

  updateCalendar() {
    this.calendar.updateTodaysDate();
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const month = date.getMonth();
      const day = date.getDate();
      let isEvent;
      this.calendarService.totalEvents.forEach((e: any) => {
        const eventMonth = e.time.getMonth();
        const eventDay = e.time.getDate();
        if (eventMonth === month && eventDay === day) {
          isEvent = true;
        }
      })
      return isEvent ? 'highlight' : ''
    };
  }

  addEvent() {
    this.dialog.open(EventModalComponent, {
      data: {date: this.currentDate}
    }).afterClosed()
      .pipe(take(1))
      .subscribe((event: CalendarEvent) => {
        if (event) {
          this.calendarService.totalEvents.push(event);
          this.calendarService.updateEvents$.next(null)
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}

//
