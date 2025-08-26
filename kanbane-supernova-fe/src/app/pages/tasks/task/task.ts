import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from './task-service';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Textarea, FormsModule, FloatLabel],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  public taskService = inject(TaskService);

  onDrawerChange(value: boolean) {
    console.log(this.taskService.getSelectedTask())
    if (value) {
      this.taskService.openDrawer();
    } else {
      this.taskService.closeDrawer();
    }
  }
}
