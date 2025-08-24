import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Kanban } from './pages/kanban/kanban';
import { ThemeService } from './services/theme.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ConfirmationService],

})
export class App implements OnInit {
  protected readonly title = signal('kanbane-supernova-fe');

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {

  }
}
