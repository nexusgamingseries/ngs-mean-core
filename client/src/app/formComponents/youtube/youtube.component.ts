import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
  standalone:true,
  imports:[FormsModule, MatLabel, MatInput, MatFormField]
})
export class YoutubeComponent implements OnInit {

  edit: boolean = false;

  @Input() set disabled(val) {
    this.edit = val;
  }

  youtubeValue: string;

  @Output()
  youtubeChange = new EventEmitter();

  @Input()
  get youtube() {
    return this.youtubeValue;
  }

  set youtube(val) {
    this.youtubeValue = val;
    this.youtubeChange.emit(this.youtubeValue);
  }

  update() {
    this.youtubeChange.emit(this.youtubeValue);
  }


  constructor() { }

  ngOnInit() {
  }
}
