import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-single-team-display',
  templateUrl: './single-team-display.component.html',
  styleUrls: ['./single-team-display.component.css'],
  standalone:true,
  imports:[TeamLinkComponent, CommonModule]
})
export class SingleTeamDisplayComponent implements OnInit, OnChanges {

  constructor(private Team:TeamService) { }

  @Input() item;
  @Input() season;

ngOnChanges(changes:SimpleChanges){
  if(changes){
    if(changes['item'].currentValue){
      this.item.logo = this.Team.imageFQDN(this.item.logo);
    }
  }
}

  ngOnInit(): void {
  }

}
