import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: "app-notes-create",
  templateUrl: "./notes-create.component.html",
  styleUrls: ["./notes-create.component.css"],
  standalone:true,
  imports:[FormsModule, MatLabel, MatFormField]
})
export class NotesCreateComponent implements OnInit {
  constructor(private notesService: NotesService) {}

  @Input() id;

  note: string = "";

  ngOnInit(): void {}

  //Output bindings
  @Output() noteCreated = new EventEmitter();

  updateNotes(obj) {
    this.noteCreated.emit(obj);
  }

  submitNote() {
    this.notesService.createNote(this.id, this.note, Date.now()).subscribe(
      (res) => {
        this.updateNotes({ id: this.id, note: this.note });
        this.note = "";
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
