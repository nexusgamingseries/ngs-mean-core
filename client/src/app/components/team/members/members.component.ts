import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { PlayerSmallCardComponent } from '../../player/player-small-card/player-small-card.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    PlayerSmallCardComponent,

  ]
})
export class MembersComponent implements OnInit {

  constructor(private util:UtilitiesService) { }

  teamMembers=[];
  profile;
  @Input() set teamProfile(val){

    this.teamMembers.length = 0;
    if(val){

      if(this.util.returnBoolByPath(val, 'teamMembers')){
        this.profile = this.util.objectCopy(val);
        this.teamMembers = this.util.objectCopy(val.teamMembers);
      }


    }
  }

  handleRemove(obj){
    let index = -1;
    this.teamMembers.forEach((ele, ind) => {
      if(ele.displayName == obj){
        index = ind;
      }
    });
    if(index>-1){
      this.teamMembers.splice(index, 1);
    }
  }

  ngOnInit() {
    // this.teamMembers.length = 0;
  }

  ngOnDestroy(){
    this.teamMembers.length = 0;
  }

}
