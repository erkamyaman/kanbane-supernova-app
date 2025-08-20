import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from './task-service';

@Component({
  selector: 'app-task',
  imports: [DrawerModule, ButtonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  providers: [TaskService]
})
export class Task {
  public taskService = inject(TaskService);
  drawerVisible = this.taskService.getTaskDrawerVisible();

  onDrawerChange(value: boolean) {
    if (value) {
      this.taskService.openDrawer();
    } else {
      this.taskService.closeDrawer();
    }
  }
}
