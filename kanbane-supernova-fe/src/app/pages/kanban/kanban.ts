import { Component } from '@angular/core';
import { KanbanBody } from './kanban-body/kanban-body';
import { Task } from '../tasks/task/task';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanBody, Task],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss'
})
export class Kanban {}
