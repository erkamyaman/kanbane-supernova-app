import { Component, inject, OnInit } from '@angular/core';
import { ColumnService, Column } from '../../services/column.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-columns',
  imports: [ButtonModule, InputTextModule, SelectModule, FormsModule, CommonModule],
  templateUrl: './columns.html',
  styleUrl: './columns.scss'
})
export class Columns implements OnInit {
  private columnService = inject(ColumnService);
  public confirmationService = inject(ConfirmationService);
  public config = inject(DynamicDialogConfig);
  public ref = inject(DynamicDialogRef)

  isLoading: boolean = false;
  columns: Column[] = [];
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  editingColumnId: string | null = null;
  onlyNewColumn: boolean = false;

  newColumn: Partial<Column> = {
    title: '',
    icon: 'pi-tag',
    iconColor: '#000000'
  };

  iconOptions = [
    { label: 'Tag', value: 'pi-tag' },
    { label: 'Asterisk', value: 'pi-asterisk' },
    { label: 'Clock', value: 'pi-clock' },
    { label: 'Crown', value: 'pi-crown' },
    { label: 'Star', value: 'pi-star' },
    { label: 'Heart', value: 'pi-heart' },
    { label: 'Check', value: 'pi-check' },
    { label: 'Times', value: 'pi-times' }
  ];

  ngOnInit() {
    this.getColumns();

    console.log(this.config)
    if (this.config.data?.onlyNewColumn == true) {
      this.onlyNewColumn = true;
      this.showCreateForm = true;
    }
  }

  getColumns() {
    this.isLoading = true;
    this.columnService.getColumns().subscribe({
      next: (data) => {
        this.columns = data;
        console.log(this.columns);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  createColumn() {
    if (!this.newColumn.title || this.newColumn.title.trim().length < 3) {
      return;
    }

    this.isLoading = true;
    this.columnService.createColumn(this.newColumn as Omit<Column, 'id'>).subscribe({
      next: (data) => {
        if (this.onlyNewColumn) {
          this.ref.close({})
          return;
        }
        this.getColumns();
        this.resetForm();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  updateColumn() {
    if (!this.editingColumnId || !this.newColumn.title ||
      this.newColumn.title.trim().length < 3) {
      return;
    }

    this.isLoading = true;
    this.columnService.updateColumn(this.editingColumnId, this.newColumn).subscribe({
      next: (data) => {
        this.getColumns();
        this.resetForm();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  editColumn(column: Column) {
    this.editingColumnId = column.id;
    this.newColumn = { ...column };
    this.showEditForm = true;
    this.showCreateForm = false;
  }

  deleteColumnConfirmation($event: MouseEvent, columnId: string) {
    event?.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this column?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.isLoading = true;
        this.columnService.deleteColumn(columnId).subscribe({
          next: (data) => {
            this.getColumns();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      },
      reject: () => {
        console.log('Deletion cancelled');
      }
    });
  }

  resetForm() {
    this.newColumn = {
      title: '',
      icon: 'pi-tag',
      iconColor: '#000000'
    };
    this.showCreateForm = false;
    this.showEditForm = false;
    this.editingColumnId = null;
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    this.showEditForm = false;
    this.editingColumnId = null;
  }
}
