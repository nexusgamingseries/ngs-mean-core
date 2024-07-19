import { Component, OnInit } from '@angular/core';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';
import { ActiveTournamentViewerComponent } from './active-tournament-viewer/active-tournament-viewer.component';
import { CommonModule } from '@angular/common';
import { PastTournamentViewerComponent } from './past-tournament-viewer/past-tournament-viewer.component';

@Component({
  selector: "app-tournament-viewer",
  templateUrl: "./tournament-viewer-page.component.html",
  styleUrls: ["./tournament-viewer-page.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    BannerImageComponent,
    ActiveTournamentViewerComponent,
    PastTournamentViewerComponent,
  ],
})
export class TournamentViewerComponent implements OnInit {
  constructor() {}

  index = 0;

  ngOnInit(): void {}
}
