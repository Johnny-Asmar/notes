import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface DialogData {
  message: string
  title?: string
  content?: string
}

@Component({
  selector: 'app-add-edit-note-popup',
  templateUrl: './add-edit-note-popup.component.html',
  styleUrl: './add-edit-note-popup.component.css'
})
export class AddEditNotePopupComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditNotePopupComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onSaveClick(): void {
    // Close the dialog and pass back the updated title and content
    this.dialogRef.close({ title: this.data.title, content: this.data.content });
  }
  

  onCancelClick(): void {
    this.dialogRef.close(true);
  }

}
