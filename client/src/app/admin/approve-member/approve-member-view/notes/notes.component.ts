import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone:true,
  imports:[]
})
export class NotesComponent implements OnInit {

  constructor(public util: UtilitiesService) { }

  collapsed = true;
  ngOnInit(): void {
  }

  @Input() queueInfo;

}
