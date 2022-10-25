import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CalendarEvent } from "../models/models";

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {
  id: number
  time: any
  name: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date, name?: string, time?: string, id?: any },
              public dialogRef: MatDialogRef<CalendarEvent>
              ) { }
  ngOnInit() {
    this.time = this.data.time ? this.data.time : null
    this.name = this.data.name ? this.data.name : null
    this.id = this.data.id ? this.data.id : null
  }

  getTime(){
    let time = this.time.split(':');
    let newDate = new Date(this.data.date.setHours(+time[0]))
    newDate.setMinutes(+time[1]);
    return newDate
  }
  onSubmit(){
    if(!this.time || !this.name){
      return
    }
   this.dialogRef.close({
     id: this.id ? this.id :  new Date().getTime(),
     name: this.name,
     time: this.getTime()
   })
  }

}
