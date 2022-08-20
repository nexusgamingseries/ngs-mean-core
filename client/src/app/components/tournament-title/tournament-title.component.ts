import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-tournament-title",
  templateUrl: "./tournament-title.component.html",
  styleUrls: ["./tournament-title.component.css"],
})
export class TournamentTitleComponent implements OnInit {
  constructor() {}

  //TODO: implement code to get event name

  @Input() challongeTournamentRef;

  ngOnInit(): void {}


}
