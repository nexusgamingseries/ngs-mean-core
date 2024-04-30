import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UpdateTeamInfoComponent } from '../update-team-info/update-team-info.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-team-view',
  templateUrl: './manage-team-view.component.html',
  styleUrls: ['./manage-team-view.component.css'],
  standalone:true,
  imports:[UpdateTeamInfoComponent, RouterModule, MatPaginatorModule]
})
export class ManageTeamViewComponent implements OnInit {

  //component properties
  recievedProfile:string = '';

  constructor(private route:ActivatedRoute) {
    if (this.route.snapshot.params['id']) {
      this.recievedProfile = this.route.snapshot.params['id'];
    }
  }

  ngOnInit() {
  }

}
