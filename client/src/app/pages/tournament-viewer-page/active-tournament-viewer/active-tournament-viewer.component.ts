import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleTableComponent } from 'src/app/elements/schedule-table/schedule-table.component';
import { ChallongeTournComponent } from 'src/app/components/challonge-tourn/challonge-tourn.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: "app-active-tournament-viewer",
  templateUrl: "./active-tournament-viewer.component.html",
  styleUrls: ["./active-tournament-viewer.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ChallongeTournComponent,
    ScheduleTableComponent,
  ],
})
export class ActiveTournamentViewerComponent implements OnInit {
  constructor(private scheduleServ: ScheduleService) {}

  index = 0;

  currentTournaments = [];
  selectedTournament = {
    challonge_url: undefined,
    teamMatches: [],
  };

  ngOnInit(): void {
    this.scheduleServ.getActiveTournaments().subscribe((res) => {
      this.currentTournaments = res;
    });
  }
}
