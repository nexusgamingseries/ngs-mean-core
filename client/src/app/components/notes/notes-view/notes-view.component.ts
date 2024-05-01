import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { initial } from 'lodash';
import { CommonModule } from '@angular/common';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { DisplayNameForIdComponent } from 'src/app/elements/display-name-for-id/display-name-for-id.component';

@Component({
  selector: "app-notes-view",
  templateUrl: "./notes-view.component.html",
  styleUrls: ["./notes-view.component.css"],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe,
    DisplayNameForIdComponent
  ]
})
export class NotesViewComponent implements OnInit {
  constructor(private notesServ: NotesService, public util:UtilitiesService) {}

  idValue
  @Input() set id(val){
    if(val){
      this.idValue = val;
      this.init();
    }
  };

  @Input() set update(val){
    if(val){
      this.init();
    }
  }

  notes = [];

  collapsed = true;

  init(){
        this.notesServ.getNotes(this.idValue).subscribe(
      res=>{
        this.notes = res;
      },
      err=>{
        console.warn(err);
      }
    );
  }
  ngOnInit(): void {

  }
}
