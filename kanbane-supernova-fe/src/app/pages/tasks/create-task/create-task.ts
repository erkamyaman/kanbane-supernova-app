import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  imports: [InputTextModule, TextareaModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss'
})
export class CreateTask {
  form!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      definition: ['', [Validators.required, Validators.minLength(100)]],
      link: ['']
    });
  }

  createTask() {
    this.ref.close({ FormData: this.form.getRawValue() });
  }
}
