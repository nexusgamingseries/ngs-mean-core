import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from '../../services/auth.service';
import { TeamService } from '../../services/team.service';
import { TimeService } from '../../services/time.service';
import { DivisionService } from '../../services/division.service';
import { UtilitiesService } from '../../services/utilities.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  recTeam
  currentSeason;
  division;
  constructor(private Auth: AuthService, private teamService: TeamService, private route: ActivatedRoute,
    private scheduleService: ScheduleService, private timeService: TimeService, private divisionService: DivisionService, private util: UtilitiesService) {
    if (this.route.snapshot.params['id']) {
      this.recTeam = this.route.snapshot.params['id'];
    }

    this.timeService.getSesasonInfo().subscribe(
      res => {
        this.currentSeason = res.value;
        this.ngOnInit();
      }
    );
  }
  grandFinalMatch = [];
  index = 0;
  roundsArray: any
  rounds: any
  noMatches: Boolean;
  ngOnInit() {
    this.grandFinalMatch = [];
    let getTeam;
    if (this.recTeam) {
      getTeam = this.recTeam;
      getTeam = this.teamService.realTeamName(getTeam);
    } else {
      getTeam = this.Auth.getTeam()
    }

    if (getTeam && this.currentSeason) {
      this.divisionService.getDivisionTeam(getTeam).subscribe(
        res => {

          let divisionInfo = res;
          let rounds = this.util.calculateRounds(divisionInfo);
          this.scheduleService
            .getTeamSchedules(this.currentSeason, getTeam)
            .subscribe(
              (res) => {
                this.grandFinalMatch = [];

                let matches = res;
                if (matches.length == 0) {
                  this.noMatches = true;
                } else {
                  this.noMatches = false;
                }
                let roundsArray = [];

                let gfMatch = _.find(matches, {
                  type: "grandfinal",
                });
                if (gfMatch) {
                  this.grandFinalMatch.push(gfMatch);
                }

                for (var i = 0; i < rounds.length; i++) {
                  if (this.rounds == null || this.rounds == undefined) {
                    this.rounds = {};
                  }

                  let realMatchNumber = i + 1;
                  roundsArray.push(realMatchNumber);
                  this.rounds[realMatchNumber] = [];

                  matches.forEach((match) => {
                    if (match.round == realMatchNumber) {
                      if (
                        this.rounds[realMatchNumber] == null ||
                        this.rounds[realMatchNumber] == undefined
                      ) {
                        this.rounds[realMatchNumber] = [];
                      }
                      this.rounds[realMatchNumber].push(match);
                    }

                  });
                }

                this.rounds;
                this.roundsArray = roundsArray;
              },
              (err) => {
                console.warn(err);
              }
            );
        },
        err => {
          console.warn(err);
        }
      )

    }

  }

}
