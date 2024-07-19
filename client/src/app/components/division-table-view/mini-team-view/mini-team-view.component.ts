import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-mini-team-view',
  templateUrl: './mini-team-view.component.html',
  styleUrls: ['./mini-team-view.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    TeamLinkComponent
  ]
})
export class MiniTeamViewComponent implements OnInit {

  constructor(public teamService: TeamService) { }


  @Input() set teams(_teams){
    if(_teams && Array.isArray(_teams) && _teams.length>0){
      this.initTeams(_teams);
    }else{
      this.teamList = [];
    }
  }

  teamList = [];
  initTeams(teams){
    this.teamService.getTeams(teams).subscribe(
      res=>{
        res.forEach(
          team=>{
            team.logo = this.teamService.imageFQDN(team.logo);
          }
        );
        this.teamList=res;
      },
      err=>{
        console.warn(err);
      }
    )
  }

  ngOnInit() {
  }

}
