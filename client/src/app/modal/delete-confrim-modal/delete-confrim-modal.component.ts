import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-delete-confrim-modal',
  templateUrl: './delete-confrim-modal.component.html',
  styleUrls: ['./delete-confrim-modal.component.css'],
  standalone:true,
  imports:[MatDialogModule, MatInput, FormsModule, MatFormField]
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
