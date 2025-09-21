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

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  name: string;
  definition: string;
  links?: string[];
  columnId: string;
  startingTime?: Date;
  notes?: string;
  labels?: Label[];
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
  availableLabels: any[] = []
  editMode: boolean = false;

  // Define the available labels with consistent colors and icons
  private predefinedLabels = [
    { id: 'l-001', name: 'Frontend', color: '#3B82F6', value: 'l-001' },
    { id: 'l-002', name: 'Angular', color: '#DD0031', value: 'l-002' },
    { id: 'l-003', name: 'Components', color: '#F59E0B', value: 'l-003' },
    { id: 'l-004', name: 'Templates', color: '#8B5CF6', value: 'l-004' },
    { id: 'l-005', name: 'Backend', color: '#10B981', value: 'l-005' },
    { id: 'l-006', name: 'Architecture', color: '#6B7280', value: 'l-006' },
    { id: 'l-007', name: 'RxJS', color: '#B7178C', value: 'l-007' },
    { id: 'l-008', name: 'Async', color: '#EC4899', value: 'l-008' },
    { id: 'l-009', name: 'Navigation', color: '#06B6D4', value: 'l-009' },
    { id: 'l-010', name: 'Forms', color: '#84CC16', value: 'l-010' },
    { id: 'l-011', name: 'Advanced', color: '#F97316', value: 'l-011' },
    { id: 'l-012', name: 'Performance', color: '#EF4444', value: 'l-012' }
  ];

  ngOnInit(): void {
    this.availableLabels = this.predefinedLabels;
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

  getLabelColor(label: Label): string {
    return label?.color || '#6c757d';
  }

  getLabelIcon(label: Label): string {
    return 'pi pi-tag';
  }

  getLabelDisplayName(label: Label): string {
    return label?.name || '';
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