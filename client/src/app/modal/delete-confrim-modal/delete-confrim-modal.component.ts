import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-confrim-modal',
  templateUrl: './delete-confrim-modal.component.html',
  styleUrls: ['./delete-confrim-modal.component.css'],
  standalone:true,
  imports:[
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class DeleteConfrimModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfrimModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  confirm: string;
}
