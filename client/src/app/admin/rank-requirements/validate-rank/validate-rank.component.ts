import { Component, OnInit } from '@angular/core';
import { QueuesService } from 'src/app/services/queues.service';
import { findIndex } from 'lodash';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: "app-validate-rank",
  templateUrl: "./validate-rank.component.html",
  styleUrls: ["./validate-rank.component.css"],
  standalone:true,
  imports:[RouterModule, FormsModule, MatSelectModule]
})
export class ValidateRankComponent implements OnInit {
  constructor(private queueService: QueuesService) {}

  count=0;
  total=0;
  queue = [];
  ngOnInit(): void {
    this.queueService.getQueues('pendingRankQueues').subscribe(
      res=>{
        this.queue = res;
        this.count = res.length;
      },
      err=>{
        console.warn(err);
      }
    )

    this.queueService.getQueuesCount("pendingRankQueuesCount").subscribe(
      res=>{
        this.total = res.queueCount;
      },
      err=>{
        console.warn(err);
      }
    )
  }

  handleAction(e){
        let index = findIndex(this.queue, e);
        if (index > -1) {
          this.queue.splice(index, 1);
          this.count = this.queue.length;
        }
  }
}
