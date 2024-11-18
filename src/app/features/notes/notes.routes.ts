import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: NotesContainerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutesModule {}
