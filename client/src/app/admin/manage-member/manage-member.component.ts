import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfrimModalComponent } from '../../modal/delete-confrim-modal/delete-confrim-modal.component';
import { AdminService } from 'src/app/services/admin.service';
import { UserSearchComponent } from 'src/app/components/user-search/user-search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css'],
  standalone:true,
  imports:[
    UserSearchComponent,
    RouterModule,

  ]
})
export class ManageMemberComponent implements OnInit {

  //component properties
  recievedProfile
  turnOnForm: boolean = false;
  confirm: string

  constructor(public dialog: MatDialog, private admin:AdminService) { }

  //functon bound to the user search event, when user is returned turn on the view to see the selected user profile
  receiveUser(userRec){
    this.turnOnForm = false;
    if (userRec != null && userRec!=undefined){
      this.turnOnForm = true;
      this.recievedProfile = userRec;
    }
  }

  //methods for opening the modal
  openDialog(): void {

    const dialogRef = this.dialog.open(DeleteConfrimModalComponent, {
      width: '300px',
      data: { confirm: this.confirm }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.toLowerCase() == 'delete') {
        this.admin.deleteUser(this.recievedProfile).subscribe(
          res => {
            this.turnOnForm = false;
            this.recievedProfile = null;
          }, err => {
            console.warn(err);
          }
        )
      }
    });
  }


  ngOnInit() {
  }

}
