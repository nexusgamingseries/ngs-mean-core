import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AdminService } from 'src/app/services/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logs-viewer',
  templateUrl: './logs-viewer.component.html',
  styleUrls: ['./logs-viewer.component.css'],
  standalone:true,
  imports:[
    RouterModule,

  ]
})
export class LogsViewerComponent implements OnInit {

  constructor(public util: UtilitiesService, private admin:AdminService) { }

  logs = [];

  ngOnInit() {
    this.admin.getLogs().subscribe(
      res=>{
       this.logs = res;
      },
      err=>{
        console.warn(err);
      }
    )
  }

}
