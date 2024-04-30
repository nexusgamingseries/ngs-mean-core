import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-division-link',
  templateUrl: './division-link.component.html',
  styleUrls: ['./division-link.component.css'],
  standalone:true,
  imports:[RouterModule]
})
export class DivisionLinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }



  @Input() division:string;

}
