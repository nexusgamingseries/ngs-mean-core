import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { DisplayNameForIdComponent } from 'src/app/elements/display-name-for-id/display-name-for-id.component';
import { StormLeagueComponent } from 'src/app/formComponents/storm-league/storm-league.component';
import { PlayerRankService } from 'src/app/services/player-rank.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-approve-rank-view",
  templateUrl: "./approve-rank-view.component.html",
  styleUrls: ["./approve-rank-view.component.css"],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe,
    StormLeagueComponent,
    DisplayNameForIdComponent
  ]
})
export class ApproveRankViewComponent implements OnInit {
  hlRankMetal;
  hlRankDivision;
  constructor(
    public User: UserService,
    private RankService: PlayerRankService
  ) {}

  queueItem;

  @Input() info: any;

  //Output bindings
  @Output() rankActioner = new EventEmitter();

  ngOnInit(): void {}

  actionRank(approve) {
    if(this.hlRankMetal == 'Unranked'){
      this.hlRankDivision = 0;
    }

    let cancelAction = false;

    let payload = {
      seasonInf: { season: this.info.season, year: this.info.year },
      userId: this.info.userId,
      hlRankMetal: this.hlRankMetal,
      hlRankDivision: this.hlRankDivision,
      verified: approve,
    };

    if(!approve){
      let invalidReason = prompt('Enter some feedback for denial.','Invalid Image');
      cancelAction = invalidReason == null;
      payload['reason'] = invalidReason
    }

    if(!cancelAction){
          this.RankService.adminActionRank(payload).subscribe(
      (res) => {
        this.rankActioner.emit(this.info);
      },
      (err) => {
        console.warn(err);
      }
    );
    }

    // console.log(this.hlRankMetal, this.hlRankDivision, approve);
  }
}
