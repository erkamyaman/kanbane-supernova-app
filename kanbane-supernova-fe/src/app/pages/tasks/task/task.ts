import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from './task-service';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { LabelOption } from '../../labels/labels';
import { LabelService } from '../../../services/label.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

export interface Task {
  id: string;
  name: string;
  definition: string;
  links?: string[];
  columnId: string;
  startingTime?: Date;
  notes?: string;
  labels?: string[];
}


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Textarea, FormsModule, MultiSelect, Tag, CommonModule, InputText, ToggleSwitchModule],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task implements OnInit {
  public taskService = inject(TaskService);
  public labelService = inject(LabelService);

  newLink: string = '';
  availableLabels: LabelOption[] = []
  editMode: boolean = false;



  ngOnInit(): void {
    this.labelService.getLabels().subscribe((data: any) => {
      this.availableLabels = data;
    });
  }

  get task(): Task {
    console.log('s')
    const task = this.taskService.getSelectedTask();
    if (task && task.links && (!task.links || task.links.length === 0)) {
      task.links = [task.link];
      task.links = [...task.links];
    }
    return task;
  }

  onDrawerChange(value: boolean) {
    console.log(this.taskService.getSelectedTask())
    if (value) {
      this.taskService.openDrawer();
    } else {
      this.taskService.closeDrawer();
    }
  }

  getLabelColor(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.color || '#6c757d';
  }

  getLabelIcon(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.icon || 'pi pi-tag';
  }

  getLabelDisplayName(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.label || labelValue;
  }

  addLink() {
    if (this.newLink && this.isValidUrl(this.newLink)) {
      const task = this.task;
      if (!task.links) {
        task.links = [];
      }
      task.links.push(this.newLink);
      task.links = [...task.links];
      this.newLink = '';
    }
  }

  removeLink(index: number) {
    const task = this.task;
    if (task.links && task.links.length > index) {
      task.links.splice(index, 1);
      task.links = [...task.links];
    }
  }

  isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}