import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  @Input() notes: any[] | null = [];
  @Output() addNote = new EventEmitter<{ title: string; content: string }>();
  @Output() editNote = new EventEmitter<any>();
  @Output() deleteNote = new EventEmitter<string>();
  @Output() filterNotes = new EventEmitter<string>();

  dataSource = new MatTableDataSource<any>(); // Initialize the data source
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference the paginator

  ngOnInit(): void {
    // Populate the data source when notes are passed as input
    if (this.notes) {
      this.dataSource.data = this.notes;
    }
  }

  ngOnChanges(): void {
    // Update the data source whenever the notes input changes
    if (this.notes) {
      this.dataSource.data = this.notes;
    }
  }

  ngAfterViewInit(): void {
    // Connect the paginator to the data source
    this.dataSource.paginator = this.paginator;
  }

  onAddNotePopup(): void {
    const newNote = { title: '', content: '' };
    this.addNote.emit(newNote);
  }

  onEditNotePopup(note: any): void {
    this.editNote.emit(note);
  }

  onDelete(noteId: string): void {
    this.deleteNote.emit(noteId);
  }

  onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterNotes.emit(filterValue);
    this.dataSource.filter = filterValue; // Apply filter to the data source
  }
}
