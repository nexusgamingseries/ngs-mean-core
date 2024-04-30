import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css'],
  standalone:true,
  imports:[FormsModule, RouterModule, ]
})
export class CreateThreadComponent implements OnInit {

  threadName;

  constructor() { }

  ngOnInit(): void {
  }

  createThread(a){
    console.log(a);
  }

}
