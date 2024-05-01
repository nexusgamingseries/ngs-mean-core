import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Match } from 'src/app/classes/match.class';
import { CommonModule } from '@angular/common';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';
import { DateTimePickerComponent } from 'src/app/formComponents/date-time-picker/date-time-picker.component';
import { CasterInputsComponent } from '../caster-inputs/caster-inputs.component';

@Component({
  selector: "app-caster-dashboard-match-display",
  templateUrl: "./caster-dashboard-match-display.component.html",
  styleUrls: ["./caster-dashboard-match-display.component.css"],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe,
    TeamLinkComponent,
    DateTimePickerComponent,
    CasterInputsComponent
  ]
})
export class CasterDashboardMatchDisplayComponent implements OnInit {
  constructor(
    private scheduleService: ScheduleService,
    public util: UtilitiesService,
    private Auth: AuthService
  ) {}

  fileLink = '';
  @Input() set recMatch(val) {
    if (val) {
      this.match = val;

    }
  }

  match = new Match();

  castTime;

  casterValid;
  @Input() ind;
  @Input() replayView = false;

  ngOnInit(): void {
    this.casterValid = this.checkRights();
          if (this.replayView) {
            this.fileLink = `/api/schedule/matchfiles?match=${this.match.matchId}`;
          }
  }

  updateView(match){
    this.match = match;
  }


  removeCaster(match) {
    this.scheduleService.addCaster(match.matchId, "", "").subscribe(
      (res) => {
        this.match = res;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  checkRights() {
    let ret = false;
    if (this.Auth.getAdmin() && this.Auth.getAdmin().indexOf("match") > -1) {
      ret = true;
    }
    return ret;
  }
}
