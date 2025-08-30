import { Component, inject, OnInit } from '@angular/core';
import { LabelService } from '../../services/label.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

export interface LabelOption {
  id: string;
  label: string;
  value: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-labels',
  imports: [ButtonModule],
  templateUrl: './labels.html',
  styleUrl: './labels.scss'
})
export class Labels implements OnInit {
  private labelService = inject(LabelService)
  public confirmationService = inject(ConfirmationService)

  isLoading: boolean = false
  labels: LabelOption[] = []

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
}
