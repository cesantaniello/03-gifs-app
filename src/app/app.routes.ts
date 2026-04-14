import { Routes } from '@angular/router';
import DashboardPageComponent from './gifs/pages/dashboard-page/dashboard-page';
import TrendingPageComponent from './gifs/pages/trending-page/trending-page';
import SearchPageComponent from './gifs/pages/search-page/search-page';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: 'trending',
        component: TrendingPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
