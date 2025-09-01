import { Component, inject, OnInit } from '@angular/core';
import { LabelService } from '../../services/label.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface LabelOption {
  id: string;
  label: string;
  value: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-labels',
  imports: [ButtonModule, InputTextModule, SelectModule, FormsModule, CommonModule],
  templateUrl: './labels.html',
  styleUrl: './labels.scss'
})
export class Labels implements OnInit {
  private labelService = inject(LabelService)
  public confirmationService = inject(ConfirmationService)

  isLoading: boolean = false
  labels: LabelOption[] = []
  showCreateForm: boolean = false
  showEditForm: boolean = false
  editingLabelId: string | null = null
  newLabel: Partial<LabelOption> = {
    label: '',
    value: '',
    color: '#000000',
    icon: 'pi pi-tag'
  }

  iconOptions = [
    { label: 'Tag', value: 'pi pi-tag' },
    { label: 'Code', value: 'pi pi-code' },
    { label: 'Cog', value: 'pi pi-cog' },
    { label: 'Server', value: 'pi pi-server' },
    { label: 'Desktop', value: 'pi pi-desktop' },
    { label: 'Database', value: 'pi pi-database' },
    { label: 'Palette', value: 'pi pi-palette' },
    { label: 'Check Circle', value: 'pi pi-check-circle' },
    { label: 'Exclamation Triangle', value: 'pi pi-exclamation-triangle' },
    { label: 'Thumbs Up', value: 'pi pi-thumbs-up' },
    { label: 'Star', value: 'pi pi-star' }
  ]

  ngOnInit() {
    this.getLabels();
  }

  getLabels() {
    this.isLoading = true;
    this.labelService.getLabels().subscribe({
      next: (data) => {
        this.labels = data;
        console.log(this.labels)
      }, error: (error) => {
        console.log(error)
      }, complete: () => {
        this.isLoading = false;
      }
    })
  }

  createLabel() {
    if (!this.newLabel.label || !this.newLabel.value ||
      this.newLabel.label.trim().length < 2 ||
      this.newLabel.value.trim().length < 2) {
      return;
    }

    this.isLoading = true;
    this.labelService.createLabel(this.newLabel as Omit<LabelOption, 'id'>).subscribe({
      next: (data) => {
        this.getLabels();
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

  updateLabel() {
    if (!this.editingLabelId || !this.newLabel.label || !this.newLabel.value ||
      this.newLabel.label.trim().length < 2 ||
      this.newLabel.value.trim().length < 2) {
      return;
    }

    this.isLoading = true;
    this.labelService.updateLabel(this.editingLabelId, this.newLabel).subscribe({
      next: (data) => {
        this.getLabels();
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

  editLabel(label: LabelOption) {
    this.editingLabelId = label.id;
    this.newLabel = { ...label };
    this.showEditForm = true;
    this.showCreateForm = false;
  }

  deleteLabelConfirmation($event: MouseEvent, labelId: string) {
    event?.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this label?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.isLoading = true;
        this.labelService.deleteLabel(labelId).subscribe({
          next: (data) => {
            this.getLabels();
          }, error: (error) => {
            console.log(error)
          }, complete: () => {
            this.isLoading = false;
          }
        })
      },
      reject: () => {
        console.log('Deletion cancelled');
      }
    });
  }

  resetForm() {
    this.newLabel = {
      label: '',
      value: '',
      color: '#000000',
      icon: 'pi pi-tag'
    };
    this.showCreateForm = false;
    this.showEditForm = false;
    this.editingLabelId = null;
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    this.showEditForm = false;
    this.editingLabelId = null;
  }
}
