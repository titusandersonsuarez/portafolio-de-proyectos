import { Routes } from '@angular/router';

export const EXPERIENCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./experience.page').then(m => m.ExperiencePage),
    title: 'Experiencia · Anderson Suárez'
  }
];
