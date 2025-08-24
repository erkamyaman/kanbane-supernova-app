import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskService } from '../../tasks/task/task-service';
import { KanbanService } from '../kanban-service';

type Task = { id: string; name: string; columnId?: string; details?: any[] };
type Column = { id: string; title: string; icon: string; iconColor: string; items: Task[] };

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
  isLoading: boolean = false;

  columns: Column[] = []
  tasks: Task[] = []

  ngOnInit() {
    this.getColumns()
  }

  getTasks() {
    this.isLoading = true;
    this.kanbanService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Task fetching completed');
      }
    })
  }

  getColumns() {
    this.isLoading = true;
    this.kanbanService.getColumns().subscribe({
      next: (data) => {
        this.columns = data;
        this.getTasks();
      },
      error: (err) => {
        console.error('Error fetching cols:', err);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Cols fetching completed');
      }
    })
  }

  dragStart(task: Task, fromColId: string) {
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

    const idx = this.tasks.findIndex((i) => i.columnId === this.draggedProduct!.columnId);
    this.tasks[idx] = { ...this.tasks[idx], columnId: toColId };

    this.draggedProduct = null;
    this.fromColId = null as any;
  }

  dragEnd() {
    this.fromColId = null as any;
    this.draggedProduct = null;
  }

  showTaskDrawer(task: any) {
    this.taskService.selectTask(task);
    this.taskService.openDrawer();
  }
}
