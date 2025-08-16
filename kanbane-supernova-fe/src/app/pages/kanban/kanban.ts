import { Component } from '@angular/core';
import { KanbanBody } from './kanban-body/kanban-body';

@Component({
  selector: 'app-kanban',
  imports: [KanbanBody],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
})
export class Kanban { }
