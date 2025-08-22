import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Kanban } from './pages/kanban/kanban';
import { Backlog } from './pages/backlog/backlog';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'kanban', pathMatch: 'full' },
      { path: 'kanban', loadComponent: () => Kanban, title: 'Kanbane Supernova' },
      { path: 'backlog', loadComponent: () => Backlog, title: 'Backlog' }
    ]
  },
  // { path: 'unauthorized', component: UnauthorizedComponent, title: 'Unauthorized' },
  { path: 'not-found', component: NotFound, title: '404' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
