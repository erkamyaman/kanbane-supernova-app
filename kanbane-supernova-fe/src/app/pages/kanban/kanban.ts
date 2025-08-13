import { Component } from '@angular/core';
import { KanbanTop } from './kanban-top/kanban-top';
import { KanbanBody } from './kanban-body/kanban-body';

@Component({
  selector: 'app-kanban',
  imports: [KanbanTop, KanbanBody],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
})
export class Kanban {}
