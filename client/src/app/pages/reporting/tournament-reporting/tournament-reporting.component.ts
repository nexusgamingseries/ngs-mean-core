import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ChallongeTournComponent } from 'src/app/components/challonge-tourn/challonge-tourn.component';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-reporting',
  templateUrl: './tournament-reporting.component.html',
  imports:[ChallongeTournComponent, CommonModule, MatSelect, MatLabel, MatFormField, MatSelect, FormsModule],
  standalone:true,
  styleUrls: ['./tournament-reporting.component.css']
})
export class TournamentReportingComponent implements OnInit {

  constructor(private auth: AuthService, private team: TeamService, private scheduleService:ScheduleService, private util:UtilitiesService) { }

  selectedTournament = {
    'season':undefined,
    'name': undefined,
    'division': undefined,
    'challonge_url':undefined
  };

  involvedTournaments = [];
  matches = [];
  _team;

  ngOnInit() {
    this._team = this.auth.getTeam();
    this.team.getTournaments(this.auth.getTeamId()).subscribe(res => {
      this.involvedTournaments = res;
    }, err => {
      console.warn('y ', err);
    })

  }

  selected() {
    this.getTeamTournamentMatches(this.selectedTournament);
  }

  getTeamTournamentMatches(tournament) {

    if (tournament.matches.length>0){
            this.scheduleService.getMatchList(tournament.matches).subscribe(
              (res) => {
                let tempMatches = res;

                tempMatches = tempMatches.filter((a) => {
                  if (this.util.returnBoolByPath(a, "home.id")) {
                    if (a.home.id == this.auth.getTeamId()) {
                      return true;
                    }
                  }
                  if (this.util.returnBoolByPath(a, "away.id")) {
                    if (a.away.id == this.auth.getTeamId()) {
                      return true;
                    }
                  }
                  return false;
                });
                this.matches = tempMatches;
              },
              (err) => {
                console.warn(err);
              }
            );
    }

  }
}
