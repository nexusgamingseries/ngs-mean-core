import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';
import { MatchupInfoEmbeddableComponent } from './matchup-info-embeddable/matchup-info-embeddable.component';
import { BannerImageComponent } from '../../banner-image/banner-image.component';

@Component({
  selector: "app-matchup-history",
  templateUrl: "./matchup-history.component.html",
  styleUrls: ["./matchup-history.component.css"],
  standalone: true,
  imports:[TeamLinkComponent, MatchupInfoEmbeddableComponent, BannerImageComponent]
})
export class MatchupHistoryComponent implements OnInit {
  constructor(private aR: ActivatedRoute) {}

  teamA;
  teamB;

  ngOnInit() {
    this.aR.paramMap.subscribe((params) => {
      this.teamA = params["params"].teamAid;
      this.teamB = params["params"].teamBid;
    });
  }
}
