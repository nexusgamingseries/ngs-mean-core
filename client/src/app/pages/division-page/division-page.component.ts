import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { DivisionService } from '../../services/division.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from '../../classes/team.class';
import { Division } from '../../classes/division';
import { TeamService } from '../../services/team.service';
import { TimeService } from '../../services/time.service';
import { TabTrackerService } from '../../services/tab-tracker.service';
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { StandingsViewComponent } from 'src/app/components/division/standings-view/standings-view.component';
import { TeamDisplayComponent } from 'src/app/components/team/team-display/team-display.component';
import { ScheduleViewComponent } from 'src/app/components/schedule/schedule-view/schedule-view.component';
import { DivisionResultsTilesComponent } from 'src/app/components/division/division-results-tiles/division-results-tiles.component';
import { ChallongeTournComponent } from 'src/app/components/challonge-tourn/challonge-tourn.component';
import { TournamentViewComponent } from 'src/app/components/tournament-view/tournament-view.component';



@Component({
  selector: 'app-division',
  templateUrl: './division-page.component.html',
  styleUrls: ['./division-page.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    StandingsViewComponent,
    TeamDisplayComponent,
    ScheduleViewComponent,
    DivisionResultsTilesComponent,
    ChallongeTournComponent,
    TournamentViewComponent
  ],
})

export class DivisionComponent implements OnInit, OnChanges, OnDestroy {



  teams:Team[]
  divSub: Subscription
  param: string
  navigationSubscription
  divDisplay = new Division();
  teamAggregate = [];
  divisionImage;
  routerWatcher;



  constructor(private division:DivisionService, private teamService:TeamService, private route:ActivatedRoute, private router: Router,
    private timeService:TimeService, private tabTacker:TabTrackerService) {


    this.routerWatcher = this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.param = this.route.snapshot.params['division'];
        this.initialise();
      }
    });

   }

   ngOnDestroy(){
     this.routerWatcher.unsubscribe();
   }

   currentSeason;

   index=0;

   setTab(ind){
     this.tabTacker.lastRoute = 'division';
     this.tabTacker.lastTab = ind;
     this.index = ind;
   }


   _passDivision;
  @Input() set passDivision(info) {
    if (info != null && info != undefined) {
      this._passDivision = info;
    }
  }

  _passSeason;
  passSeasonVal;
  @Input() set passSeason(info) {
    if (info != null && info != undefined) {
      this._passSeason = true;
      this.passSeasonVal = info;
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('passDivision')) {
      let currentDivConcat = changes.passDivision.currentValue ? changes.passDivision.currentValue : null;
      let previousDivConcat = changes.passDivision.previousValue ? changes.passDivision.previousValue : null;
      if (currentDivConcat != null && currentDivConcat != previousDivConcat && this._passSeason) {
        this.ngOnInit();
      }
    }
    if (changes.hasOwnProperty('passSeason')) {
      let currentSea = changes.passSeason.currentValue ? changes.passSeason.currentValue : null;
      let previousSea = changes.passSeason.previousValue ? changes.passSeason.previousValue : null;
      if (currentSea != null && currentSea != previousSea && this._passDivision) {
        this.ngOnInit();
      }
    }

  }


  //this initialise shall be ran if the division component is loaded via a route; or in best estimation ... via current season loading a division...
  initialise(){
    this.teamAggregate=[];
    this.divDisplay = new Division();
    this.timeService.getSesasonInfo().subscribe(res => {
      this.currentSeason = res.value;
    });
    this.divSub = this.division.getDivision(this.param).subscribe((res) => {
      if(res!=undefined&&res!=null){
        this.divDisplay = res;
        this.divisionImage = `${environment.awsTld}/${environment.s3bucketGeneralImage}/divimg/${this.divDisplay.divisionConcat}.png`;
        if(this.divDisplay.cupDiv){
          this.teamAggregate = this.divDisplay.teams.concat(this.divDisplay.participants);
        }else{
          this.teamAggregate = this.divDisplay.teams
        }
        this.index = this.tabTacker.returnTabIndexIfSameRoute('division');
      }
    }, (err)=>{

        });

  }

  ngOnInit() {
    if (this._passDivision){
      this.teamAggregate = [];
      this.divDisplay = this._passDivision;
      if (this._passDivision.cupDiv) {
        this.teamAggregate = this._passDivision.teams.concat(this._passDivision.participants);
      } else {
        this.teamAggregate = this._passDivision.teams
      }
    }
  }

}
