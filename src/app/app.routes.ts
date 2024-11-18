import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
          import('./features/login/login.module').then((m) => m.LoginModule),
 
    },
    {
        path: 'section',
        loadChildren: () =>
          import('./features/sections/sections.module').then((m) => m.SectionsModule),

    },
     
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: '**',
        redirectTo: '/auth/login'
      },
];
