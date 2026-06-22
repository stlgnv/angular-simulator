import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page.component')
        .then(c => c.HomePageComponent)
  },
  {
    path: 'users-page',
    loadComponent: () =>
      import('./components/users-page/users-page.component')
        .then(c => c.UsersPageComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component')
        .then(c => c.NotFoundPageComponent)
  }
];
