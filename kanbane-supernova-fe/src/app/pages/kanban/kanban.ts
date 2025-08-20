import { Component, inject } from '@angular/core';
import { KanbanBody } from './kanban-body/kanban-body';
import { Task } from '../tasks/task/task';
import { TaskService } from '../tasks/task/task-service';

@Component({
  selector: 'app-kanban',
  imports: [KanbanBody, Task],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
  providers: [TaskService]
})
export class Kanban {
  public taskService = inject(TaskService);

  showTaskDrawer(task: any) {
    console.log(task);
    this.taskService.selectTask(task);
    this.taskService.openDrawer();
  }
}
