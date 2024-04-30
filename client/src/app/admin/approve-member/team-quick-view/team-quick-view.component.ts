import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../classes/team.class';
import { StormLeagueComponent } from 'src/app/formComponents/storm-league/storm-league.component';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';

@Component({
  selector: 'app-team-quick-view',
  templateUrl: './team-quick-view.component.html',
  styleUrls: ['./team-quick-view.component.css'],
  standalone:true,
  imports:[StormLeagueComponent, TeamLinkComponent]
})
export class TeamQuickViewComponent implements OnInit {
  //component properties
  _teamName: string
  disTeam = new Team(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

  //Input bindings
  @Input() set teamName(team){
    if(team!=undefined&&team!=null){
      this.disTeam = team;
    }
  }

  constructor(public team : TeamService) { }

  ngOnInit() {
  }

}
