import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { CommonPipePipe } from 'src/app/common/common-pipe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve-avatar-view',
  templateUrl: './approve-avatar-view.component.html',
  styleUrls: ['./approve-avatar-view.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    CommonPipePipe
  ]
})
export class ApproveAvatarViewComponent implements OnInit {

  constructor(public User:UserService, private admin:AdminService) { }

  queueItem;
  @Input() set info(val){
    if(val){
      this.queueItem = val;
    }
  }

  //Output bindings
  @Output() avatarActioned = new EventEmitter();

  //sends events to accountActioned output binding
  avatarActioner() {
    this.avatarActioned.emit(this.queueItem);
  }

  ngOnInit() {
  }

  actionAvatar(act){
    this.admin.avatarQueuePost(this.queueItem.userId, this.queueItem.fileName, act).subscribe(
      res=>{
        this.avatarActioner();
      },
      err=>{
        console.warn(err);
      }
    )
  }

}
