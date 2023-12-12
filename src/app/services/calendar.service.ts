import { Injectable, OnInit } from '@angular/core';
import { CalendarEvent } from "../models/models";
import { Subject } from "rxjs";

export const totaLevents: CalendarEvent[] = [
  {
    id: 1,
    name: 'Event 1',
    time: new Date('10-11-2022')
  },
  {
    id: 2,
    name: 'Event 2',
    time: new Date('10-12-2022')
  },
  {
    id: 3,
    name: 'Event 3',
    time: new Date('10-13-2022')
  },
]

@Injectable({
  providedIn: 'root'
})
export class CalendarService implements OnInit{
  updateEvents$ = new Subject()
  totalEvents: CalendarEvent[] = totaLevents
  ngOnInit() {

  }

  constructor() { }
}
