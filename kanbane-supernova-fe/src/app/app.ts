import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Kanban } from './pages/kanban/kanban';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('kanbane-supernova-fe');

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    // Theme service will auto-initialize
  }
}
