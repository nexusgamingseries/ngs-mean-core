import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-division-management',
  templateUrl: './division-management.component.html',
  styleUrls: ['./division-management.component.css'],
  standalone:true,
  imports:[MatTab,MatTabGroup,MatTabContent]
})
export class DivisionManagementComponent implements OnInit {

  constructor(){

  }

  ngOnInit(){

  }

}
