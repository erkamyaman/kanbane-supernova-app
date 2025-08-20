import { Component, inject, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from './task-service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DrawerModule, ButtonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  public taskService = inject(TaskService);

  onDrawerChange(value: boolean) {
    if (value) {
      this.taskService.openDrawer();
    } else {
      this.taskService.closeDrawer();
    }
  }
}
