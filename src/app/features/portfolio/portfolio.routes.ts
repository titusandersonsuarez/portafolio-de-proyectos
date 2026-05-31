import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio.page').then(m => m.PortfolioPage),
    title: 'Portafolio · Anderson Suárez'
  }
];
