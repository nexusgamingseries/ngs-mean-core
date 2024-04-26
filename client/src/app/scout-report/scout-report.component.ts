import { Component, OnInit } from '@angular/core';
import { MatchupHistoryComponent } from '../components/match/matchup-history/matchup-history.component';

@Component({
  selector: 'app-scout-report',
  standalone:true,
  templateUrl: './scout-report.component.html',
  imports:[MatchupHistoryComponent],
  styleUrls: ['./scout-report.component.css']
})
export class ScoutReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
