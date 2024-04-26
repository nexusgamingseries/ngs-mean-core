import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css'],
  standalone:true,
  imports:[MatInput, MatLabel, MatFormField, FormsModule]
})
export class TwitchComponent implements OnInit {

  edit: boolean = false;

  @Input() set disabled(val) {
    this.edit = val;
  }

  twitchValue: string;

  @Output()
  twitchChange = new EventEmitter();

  @Input()
  get twitch() {
    return this.twitchValue;
  }

  set twitch(val) {
    this.twitchValue = val;
    this.twitchChange.emit(this.twitchValue);
  }

  update() {
    this.twitchChange.emit(this.twitchValue);
  }


  constructor() { }

  ngOnInit() {
  }
}
