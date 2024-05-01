import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-change-captain-modal',
  templateUrl: './change-captain-modal.component.html',
  styleUrls: ['./change-captain-modal.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})

export class ChangeCaptainModalComponent implements OnInit {
  selected:string
  newCaptain:string
  memberSelected:string
  constructor(
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: dataModel
  )
    {}

  ngOnInit() {

  }

}

export interface dataModel {
  members: any,
  captain: any
}
