import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { CurrentlyLiveGamesComponent } from 'src/app/components/currently-live-games/currently-live-games.component';
import { DivisionStandingsComponent } from 'src/app/components/division-standings/division-standings.component';
import { DivisionTableViewComponent } from 'src/app/components/division-table-view/division-table-view.component';
import { LargeCarouselComponent } from 'src/app/components/large-carousel/large-carousel.component';
import { LeagueStatsComponent } from 'src/app/components/league-stats/league-stats.component';
import { MvpDisplayComponent } from 'src/app/components/mvp-display/mvp-display.component';
import { RecentNewsComponent } from 'src/app/components/recent-news/recent-news.component';
import { RecentResultsComponent } from 'src/app/components/recent-results/recent-results.component';
import { TopStatsWidgetComponent } from 'src/app/components/top-stats-widget/top-stats-widget.component';
import { UpcomingMatchesComponent } from 'src/app/components/upcoming-matches/upcoming-matches.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:true,
  imports:[
    CommonModule,
    UpcomingMatchesComponent,
    LeagueStatsComponent,
    RecentNewsComponent,
    MvpDisplayComponent,
    CountdownComponent,
    TopStatsWidgetComponent,
    RecentResultsComponent,
    DivisionStandingsComponent,
    LargeCarouselComponent,
    CurrentlyLiveGamesComponent,
    DivisionTableViewComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  index = 0;

  ngOnInit() {

  }

}
