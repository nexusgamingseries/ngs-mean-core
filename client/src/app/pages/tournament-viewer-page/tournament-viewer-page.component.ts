import { Component, OnInit } from '@angular/core';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';
import { ActiveTournamentViewerComponent } from './active-tournament-viewer/active-tournament-viewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-viewer',
  standalone:true,
  imports:[BannerImageComponent, ActiveTournamentViewerComponent, CommonModule],
  templateUrl: './tournament-viewer-page.component.html',
  styleUrls: ['./tournament-viewer-page.component.css']
})
export class TournamentViewerComponent implements OnInit {

  constructor() { }

  index = 0;

  ngOnInit(): void {
  }

}
