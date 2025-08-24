import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskService } from '../../tasks/task/task-service';
import { Task } from '../../tasks/task/task';
import { KanbanService } from '../kanban-service';

type TaskType = { id: string; name: string; columnId?: string; details?: any[] };
type Column = { id: string; title: string; icon: string; iconColor: string; items: TaskType[] };

@Component({
  selector: 'app-kanban-body',
  imports: [DragDropModule, NgClass, NgStyle],
  templateUrl: './kanban-body.html',
  styleUrl: './kanban-body.scss'
})
export class KanbanBody {
  public taskService = inject(TaskService);
  public kanbanService = inject(KanbanService);

  fromColId: string = '';
  draggedProduct: any | undefined | null;

  columns: Column[] = []

  ngOnInit() {
    this.kanbanService.getTasks().subscribe({
      next: (data) => {
        this.columns = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
      complete: () => {
        console.log('Task fetching completed');
      }
    })
  }

  dragStart(task: TaskType, fromColId: string) {
    this.draggedProduct = task;
    this.fromColId = fromColId;
  }

  drop(toColId: string) {
    if (!this.draggedProduct || !this.fromColId) return;

    const fromCol = this.columns.find((c) => c.id === this.fromColId)!;
    const toCol = this.columns.find((c) => c.id === toColId)!;

    if (fromCol.id === toCol.id) {
      return;
    }

    const idx = fromCol.items.findIndex((i) => i.id === this.draggedProduct!.id);
    if (idx > -1) fromCol.items.splice(idx, 1);
    toCol.items.push({ ...this.draggedProduct, columnId: toColId });

    // If using OnPush, reassign changed columns to trigger view updates:
    // this.columns = this.columns.map(c =>
    //   c.id === fromCol.id ? { ...c, items: [...fromCol.items] } :
    //   c.id === toCol.id   ? { ...c, items: [...toCol.items] }   : c
    // );

    this.draggedProduct = null;
    this.fromColId = null as any;
  }

  dragEnd() {
    this.fromColId = null as any;
    this.draggedProduct = null;
  }

  showTaskDrawer(task: any) {
    this.taskService.selectTask(task); // optional: set selected task
    this.taskService.openDrawer(); // open the drawer
  }
}
