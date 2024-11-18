import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesRoutesModule } from './notes.routes';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { AddEditNotePopupComponent } from './components/add-edit-note-popup/add-edit-note-popup.component';



@NgModule({
  declarations: [NotesContainerComponent, NotesListComponent, ConfirmPopupComponent, AddEditNotePopupComponent],
  imports: [CommonModule, NotesRoutesModule, HttpClientModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule, MatPaginatorModule, 
  ]
})
export class NotesModule { }
