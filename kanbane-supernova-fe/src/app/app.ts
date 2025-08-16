import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Kanban } from './pages/kanban/kanban';
import { Topbar } from './pages/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Kanban, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('kanbane-supernova-fe');
}
