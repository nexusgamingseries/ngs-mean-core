import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChallongeTournComponent } from 'src/app/components/challonge-tourn/challonge-tourn.component';
import { ScheduleTableComponent } from 'src/app/elements/schedule-table/schedule-table.component';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: "app-past-tournament-viewer",
  templateUrl: "./past-tournament-viewer.component.html",
  styleUrls: ["./past-tournament-viewer.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ChallongeTournComponent,
    ScheduleTableComponent,
  ],
})
export class PastTournamentViewerComponent implements OnInit {
  constructor(private scheduleServ: ScheduleService) {}

  currentTournaments = [];
  selectedTournament = {
    challonge_url: undefined,
    teamMatches: [],
  };

  ngOnInit(): void {
    this.scheduleServ.getPastNonSeasonalTournaments().subscribe((res) => {
      this.currentTournaments = res;
    });
  }
}
