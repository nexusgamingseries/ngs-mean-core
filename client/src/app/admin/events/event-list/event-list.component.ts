import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone:true,
  imports:[
    RouterModule,
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField
  ]
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  events=[]

  ngOnInit() {
    this.eventService.getAll().subscribe(
      res=>{
        this.events = res;
      },
      err=>{
        console.warn(err);
      }
    )

  }

  delete(event){
    this.eventService.deleteEvent(event._id).subscribe(
      res=>{

        let index = -1;
        this.events.forEach((event,ind)=>{
          if(event._id == event._id){
            index = ind;
          }
        });

        if(index>-1){
          this.events.splice(index, 1);
        }
      },
      err=>{
        console.warn(err);
      }
    )
  }

  openEvent(){

  }
}
