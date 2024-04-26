import { Component, OnInit, Input } from '@angular/core';
import { GamesInformationComponent } from 'src/app/components/match/games-information/games-information.component';
import { MatchResultsHeaderComponent } from 'src/app/components/match/match-results-header/match-results-header.component';

@Component({
  selector: 'app-champ-expander',
  templateUrl: './champ-expander.component.html',
  standalone:true,
  imports:[GamesInformationComponent, MatchResultsHeaderComponent],
  styleUrls: ['./champ-expander.component.css']
})
export class ChampExpanderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hide=true;

  @Input() match;

}
