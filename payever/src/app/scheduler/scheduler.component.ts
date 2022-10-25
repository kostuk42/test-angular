import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CalendarEvent } from "../models/models";
import { CalendarService } from "../services/calendar.service";
import { Subscription, take } from "rxjs";
import { EventModalComponent } from "../event-modal/event-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnChanges, OnDestroy {

  hours: any = [];
  events: any = [];
  sub: Subscription | null = null
  @Input() schedulingDate: Date = new Date()
  @Output() eventsChanged = new EventEmitter<CalendarEvent[]>()

  constructor(public calendarService: CalendarService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateEvents();
    if (!this.sub) {
      this.calendarService.updateEvents$.subscribe(() => this.updateEvents())
    }
  }

  onEdit(event: CalendarEvent) {
    let hours: any = event.time.getHours();
    let minutes: any = event.time.getMinutes();
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 9) {
      minutes = '0' + minutes
    }
    this.dialog.open(EventModalComponent, {
      data: {
        date: event.time,
        time: hours + ':' + minutes,
        name: event.name,
        id: event.id
      }
    }).afterClosed()
      .pipe(take(1))
      .subscribe((event: CalendarEvent) => {
        if (event) {
          this.calendarService.totalEvents = this.calendarService.totalEvents.map(e => e.id === event.id ? event : e);
          this.calendarService.updateEvents$.next(null)
        }
      })
  }

  onDelete(event: CalendarEvent) {
    this.calendarService.totalEvents = this.calendarService.totalEvents.filter(e => e.id !== event.id);
    this.calendarService.updateEvents$.next(null)
  }

  updateEvents() {
    if (!this.hours.length) {
      for (let h = 0; h < 24; h += 1) {
        this.hours.push({
          name: h + ' h'
        })
        this.events.push(null)
      }
    }
    this.events.fill(null);
    const dayStart = new Date(this.schedulingDate).setHours(0);
    const dayEnd = new Date(this.schedulingDate).setHours(23, 59, 59, 999);

    const todayEvents = this.calendarService.totalEvents.filter((e: any) => {
      return e.time >= dayStart && e.time.getTime() <= dayEnd
    });
    todayEvents.forEach((e: any) => {
      let index = e.time.getHours();
      this.events[index] = e;
    })
  }

  ngOnChanges() {
    this.updateEvents()
  }

  drop(e: CdkDragDrop<CalendarEvent[]>) {

    moveItemInArray(this.events, e.previousIndex, e.currentIndex);
    let currentEvent = this.events[e.currentIndex]
    if (currentEvent) {
      currentEvent.time = this.getChangedTime(e.currentIndex);
      this.events[e.currentIndex].time = currentEvent.time;
      const existingEvents = this.events.filter((e: CalendarEvent) => !!e)
      this.eventsChanged.emit(existingEvents)
    }
  }

  ngOnDestroy() {
    this.sub!.unsubscribe()
  }

  getChangedTime(index: any) {
    const eventTime = this.events[index].time;
    eventTime.setHours(index);
    eventTime.setMinutes(0);
    return eventTime
  }
}
