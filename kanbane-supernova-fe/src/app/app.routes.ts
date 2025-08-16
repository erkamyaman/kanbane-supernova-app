import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Kanban } from './pages/kanban/kanban';
import { Backlog } from './pages/backlog/backlog';

export const routes: Routes = [{
    path: '',
    component: Layout,
    children: [
        { path: '', redirectTo: 'kanban', pathMatch: 'full' },
        { path: 'kanban', loadComponent: () => Kanban, title: 'Kanban' },
        { path: 'backlog', loadComponent: () => Backlog, title: 'Backlog' },
    ]
}];
// { path: 'unauthorized', component: UnauthorizedComponent, title: 'Unauthorized' },
// { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
// { path: 'not-found', component: NotFoundComponent, title: '404' }
// 


