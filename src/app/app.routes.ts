import { Routes } from '@angular/router';
import DashboardPageComponent from './gifs/pages/dashboard-page/dashboard-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  }
];
