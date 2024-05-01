import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { TeamService } from 'src/app/services/team.service';
import { CommonModule } from '@angular/common';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';

@Component({
  selector: 'app-division-upcoming-matches',
  templateUrl: './division-upcoming-matches.component.html',
  styleUrls: ['./division-upcoming-matches.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe,
    TeamLinkComponent
  ]
})
export class DivisionUpcomingMatchesComponent implements OnInit {

  constructor(private scheduleService:ScheduleService, public util:UtilitiesService, public teamServ:TeamService) { }

  @Input() set division(val){
    if(val){
      this.initSched(val);
    }
  }

  next4matches=[];
  initSched(filter){
    this.next4matches.length = 0;
    this.scheduleService.getNearestDivisionMatches(filter, 4).subscribe(
      res=>{
        res.forEach((match, ind) => {
          if (ind < 4) {
            match.home.logo = this.teamServ.imageFQDN(match.home.logo);
            match.away.logo = this.teamServ.imageFQDN(match.away.logo);
            this.next4matches.push(match);
          }
        });
      },
      err=>{
        console.warn(err);
      }
    );
  }

  ngOnInit() {

  }

}
