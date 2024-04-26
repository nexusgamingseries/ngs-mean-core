import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-session-timeout',
  imports:[RouterModule],
  standalone:true,
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
