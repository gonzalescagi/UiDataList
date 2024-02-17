import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  { path: 'details/:index', loadChildren: './details/details.module#DetailsModule'}
];