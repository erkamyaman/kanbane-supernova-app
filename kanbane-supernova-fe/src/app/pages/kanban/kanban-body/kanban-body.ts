import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TaskService } from '../../tasks/task/task-service';
import { KanbanService } from '../../../services/kanban-service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ColumnService } from '../../../services/column.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Columns } from '../../columns/columns';
import { Topbar } from '../../../layout/topbar/topbar';

export type Label = { id: string; name: string; color: string };
export type Task = { id: string; name: string; columnId?: string; details?: any[]; labels?: Label[] };
export type Column = { id: string; title: string; icon: string; iconColor: string; };

@Component({
  selector: 'app-kanban-body',
  imports: [DragDropModule, NgClass, NgStyle, ConfirmDialogModule, FormsModule, DialogModule, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './kanban-body.html',
  styleUrl: './kanban-body.scss',
  providers: [DialogService]

})
export class KanbanBody {
  public taskService = inject(TaskService);
  public kanbanService = inject(KanbanService);
  public confirmationService = inject(ConfirmationService);
  public columnService = inject(ColumnService);
  dialogService = inject(DialogService);

  fromColId: string = '';
  draggedProduct: any | undefined | null;
  isLoading: boolean = false;
  ref: DynamicDialogRef | undefined;

  columns: Column[] = []
  tasks: Task[] = []
  editingColumn: Column | null = null;
  showEditForm: boolean = false;

  iconOptions = [
    { label: 'Tag', value: 'pi-tag' },
    { label: 'Asterisk', value: 'pi-asterisk' },
    { label: 'Clock', value: 'pi-clock' },
    { label: 'Crown', value: 'pi-crown' },
    { label: 'Star', value: 'pi-star' },
    { label: 'Heart', value: 'pi-heart' },
    { label: 'Check', value: 'pi-check' },
    { label: 'Times', value: 'pi-times' },
    { label: 'Code', value: 'pi-code' },
    { label: 'Cog', value: 'pi-cog' },
    { label: 'Server', value: 'pi-server' },
    { label: 'Desktop', value: 'pi-desktop' },
    { label: 'Database', value: 'pi-database' },
    { label: 'Palette', value: 'pi-palette' },
    { label: 'Check Circle', value: 'pi-check-circle' },
    { label: 'Exclamation Triangle', value: 'pi-exclamation-triangle' },
    { label: 'Thumbs Up', value: 'pi-thumbs-up' }
  ];

  ngOnInit() {
    this.getColumns()
    this.kanbanService.taskCreatedSubject.subscribe((val) => {
      if (val) {
        this.getTasks();
        this.kanbanService.taskCreatedSubject.next(false)
      }
    })
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
    console.log(this.draggedProduct)
    if (!this.draggedProduct || !this.fromColId) return;

    const fromCol = this.columns.find((c) => c.id === this.fromColId)!;
    const toCol = this.columns.find((c) => c.id === toColId)!;

    if (fromCol.id === toCol.id) {
      return;
    }

    const idx = this.tasks.findIndex((i) => i.id === this.draggedProduct!.id);
    console.log(this.tasks[idx])

    const updatedTask = { ...this.tasks[idx], columnId: toColId };
    console.log(updatedTask)
    this.kanbanService.dropTask(this.draggedProduct.id, updatedTask).subscribe({
      next: () => {
        this.getTasks();
      }
    })

    this.draggedProduct = null;
    this.fromColId = null as any;
  }

  deleteTask($event: MouseEvent, id: string) {
    event?.stopPropagation();

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.kanbanService.deleteTask(id).subscribe({
          next: () => {
            this.getTasks();
          }
        })
      },
      reject: () => {
        console.log('Deletion cancelled');
      }
    });
  }

  dragEnd() {
    this.fromColId = null as any;
    this.draggedProduct = null;
  }

  showTaskDrawer(task: any) {
    this.taskService.selectTask(task);
    this.taskService.openDrawer();
  }

  editColumn(column: Column) {
    this.editingColumn = { ...column };
    this.showEditForm = true;
  }

  updateColumn() {
    if (!this.editingColumn || !this.editingColumn.title || this.editingColumn.title.trim().length < 3) {
      return;
    }

    this.isLoading = true;
    this.columnService.updateColumn(this.editingColumn.id, this.editingColumn).subscribe({
      next: (data) => {
        this.getColumns();
        this.cancelEdit();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteColumn(id: string) {
    event?.stopPropagation();

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this column?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.columnService.deleteColumn(id).subscribe({
          next: () => {
            this.getColumns();
          }
        })
      },
      reject: () => {
        console.log('Deletion cancelled');
      }
    });
  }

  cancelEdit() {
    this.editingColumn = null;
    this.showEditForm = false;
  }

  get isUpdateDisabled(): boolean {
    return !this.editingColumn?.title || this.editingColumn.title.trim().length < 3 || this.isLoading;
  }

  openColumnsDialog() {
    this.ref = this.dialogService.open(Columns, {
      header: 'Columns',
      width: '600px',
      modal: true,
      closable: true,
      draggable: true,
      data: {
        onlyNewColumn: true
      }
    });

    this.ref.onClose.subscribe(() => {
      this.getColumns();
    });
  }

  // experimental
  someMethod(number1: number, number2: number) {
    const func = Topbar.func(number1, number2)
    console.log(func)
  }

}
