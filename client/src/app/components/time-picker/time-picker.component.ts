import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.css"],
})
export class TimePickerComponent implements OnInit {
  constructor() {}

  days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  hours = [];
  activate = {};
  ngOnInit(): void {
    for (var i = 0; i < 23; i++) {
      this.hours.push(i);
    }
  }

  selectTime(hour, day) {
    console.log(hour, day);
    this.activateDayTime(day, hour);
  }

  mouseStart(hour, day) {
    console.log("mouseStart", hour, day);
  }

  mouseEnd(hour, day) {
    console.log("mouseEnd", hour, day);
  }

  mouseDragOver(hour, day) {
    console.log("mouseDragOver", hour, day);
  }

  mouseDrag(hour, day) {
    console.log("mouseDrag", hour, day);
  }
  mouseEnter($e, hour, day) {
    console.log("mouseEnter", $e, hour, day);
    if ($e.buttons == 1) {
      this.activateDayTime(day, hour);
    }
    console.log(this.activate);
  }

  private activateDayTime(day: any, hour: any) {
    let key = `${day}:${hour}`;
    if (this.activate.hasOwnProperty(key)) {
      this.activate[key] = !this.activate[key];
    } else {
      this.activate[key] = true;
    }
  }

  mouseOver($event, hour, day) {
    console.log("mouseOver", $event, hour, day);
    if ($event.buttons == 1) {
      this.activateDayTime(day, hour);
    }
  }

  // mouseOver($event, hour, day) {
  //   console.log("mouseOver", $event, hour, day);
  //   if ($event.buttons == 1) {
  //     this.activateDayTime(day, hour);
  //   }
  // }
}
