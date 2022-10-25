import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { MatSliderModule } from "@angular/material/slider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SchedulerComponent } from "../scheduler/scheduler.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonToggleModule } from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    CalendarComponent,
    SchedulerComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatButtonToggleModule,
  ]
})
export class CalendarModule {
}
