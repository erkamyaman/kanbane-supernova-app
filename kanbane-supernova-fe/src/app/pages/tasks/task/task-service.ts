import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskDrawerVisible = signal(false);
  selectedTask = signal<any>(null);

  getSelectedTask = this.selectedTask.asReadonly();
  getTaskDrawerVisible = this.taskDrawerVisible.asReadonly();

  selectTask(task: any) {
    this.selectedTask.set(task);
  }

  removeTask() {
    this.selectedTask.set(null);
  }

  openDrawer() {
    this.taskDrawerVisible.set(true);
  }

  closeDrawer() {
    this.taskDrawerVisible.set(false);
  }
}
