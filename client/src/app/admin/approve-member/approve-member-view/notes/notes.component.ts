import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe
  ]
})
export class NotesComponent implements OnInit {

  constructor(public util: UtilitiesService) { }

  collapsed = true;
  ngOnInit(): void {
  }

  @Input() queueInfo;

}
