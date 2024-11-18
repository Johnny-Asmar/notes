import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsContainerComponent } from './containers/sections-container.component';

const routes: Routes = [
    {
        path: '',
        component: SectionsContainerComponent,
        // canActivateChild: [PermissionGuard],
        children: [
          {
            path: 'notes',
            loadChildren: () =>
              import('../notes/notes.module').then((m) => m.NotesModule),
          },
        ],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutesModule {}
