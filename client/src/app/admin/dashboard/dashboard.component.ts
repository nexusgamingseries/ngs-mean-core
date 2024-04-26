import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[RouterModule]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
