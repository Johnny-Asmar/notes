import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirebaseService } from '../../../../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../../../../shared/components/confirm-popup/confirm-popup.component';
import { AddEditNotePopupComponent } from '../../components/add-edit-note-popup/add-edit-note-popup.component';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.css'],
})
export class NotesContainerComponent implements OnInit, OnDestroy {
  allNotes: any[] = [];
  filteredNotes: any[] = [];
  filterValue: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private firebaseService: FirebaseService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.firebaseService
      .getNotes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((notes) => {
        this.allNotes = notes;
        this.filteredNotes = notes;
        console.log("filterdNotes on init", this.filteredNotes)
      });
  }

  handleFilter(filterValue: string) {
    this.filterValue = filterValue.toLowerCase();
    this.filteredNotes = this.allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(this.filterValue) ||
        note.content.toLowerCase().includes(this.filterValue)
    );
    console.log("filteredNotes on filter", this.filteredNotes)
  }

  handleAddNotePopup(): void {
    const dialogRef = this.matDialog.open(AddEditNotePopupComponent, {
      width: '400px',
      data: {
        title: '',
        content: '',
        message: 'Create a new note'
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firebaseService.addNote({title: result.title, content: result.content})
          .then(() => {
            console.log('Note added successfully');
            this.refreshNotes();
          })
          .catch((error) => console.error('Error adding note:', error));
      }
    });
  }
  
  private refreshNotes(): void {
    this.firebaseService.getNotes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((notes) => {
        this.allNotes = notes;
        this.filteredNotes = this.applyFilter(notes, this.filterValue);
      });
  }
  



  handleEditNotePopup(note: any): void {
    const dialogRef = this.matDialog.open(AddEditNotePopupComponent, {
      width: '400px',
      data: {
        title: note.title,
        content: note.content,
        message: 'Edit your note'
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Save the updated note
        const updatedNote = { ...note, title: result.title, content: result.content };
        this.firebaseService.updateNote(note.id, updatedNote.title, updatedNote.content)
          .then(() => {
            console.log('Note updated successfully');
            // Refresh notes
            this.refreshNotes();
          })
          .catch((error) => console.error('Error updating note:', error));
      }
    });
  }
  

  handleDeleteNote(noteId: string) {
    const dialogRef = this.matDialog.open(ConfirmPopupComponent, {
      data: { message: 'Are you sure you want to delete this note?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.deleteNote(noteId)
      }
    });

  }

  private applyFilter(notes: any[], filterValue: string): any[] {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(filterValue) ||
        note.content.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy() {
    // Complete the subject to unsubscribe all observables
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
