import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban-service';
import { Column } from '../../../layout/topbar/kanban-types';
import { SelectModule } from 'primeng/select';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-create-task',
  imports: [InputTextModule, TextareaModule, ButtonModule, FormsModule, ReactiveFormsModule, SelectModule, NgStyle],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss'
})
export class CreateTask {
  form!: FormGroup;
  columns: Column[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    public kanbanService: KanbanService
  ) {
    this.getColumns();

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      column: [null, Validators.required],
      definition: ['', [Validators.required, Validators.minLength(50)]],
      link: ['']
    });
  }

  createTask() {
    console.log(this.form.getRawValue())
    const task = {
      name: this.form.getRawValue().name,
      columnId: this.form.getRawValue().column.id,
      definition: this.form.getRawValue().definition,
      link: this.form.getRawValue().link,
    }
    this.kanbanService.createTask(task).subscribe({
      next: (data) => {
        console.log(data);
        this.ref.close({ FormData: this.form.getRawValue() });
      }
    })
  }

  getColumns() {
    this.kanbanService.getColumns().subscribe({
      next: (data) => {
        this.columns = data
      }, error: (err) => {
        console.log('Cols fetching error');

      }, complete: () => {
        console.log('Cols fetching completed');
      }
    })
  }
}
