import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { UtilitiesService } from '../../services/utilities.service';
import { TeamService } from '../../services/team.service';
import { CommonModule } from '@angular/common';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';

@Component({
  selector: "app-upcoming-matches",
  templateUrl: "./upcoming-matches.component.html",
  styleUrls: ["./upcoming-matches.component.css"],
  standalone: true,
  imports:[
    CommonModule,
    CommonPipePipe,
    TeamLinkComponent,

  ]
})
export class UpcomingMatchesComponent implements OnInit {
  constructor(
    private scheduleService: ScheduleService,
    public util: UtilitiesService,
    public team: TeamService
  ) {}

  next4matches = [];

  ngOnInit() {
    this.scheduleService.getNearestMatches(4).subscribe(
      (res) => {
        console.log('res', res);
        res.forEach((match, ind) => {
          if (ind < 4) {
            if (this.util.returnBoolByPath(match, "home.logo")) {
              match.home.logo = this.team.imageFQDN(match.home.logo);
            }
            if (this.util.returnBoolByPath(match, "away.logo")) {
              match.away.logo = this.team.imageFQDN(match.away.logo);
            }
            this.next4matches.push(match);
          }

        });
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
