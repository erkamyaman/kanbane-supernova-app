import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TaskService } from './task-service';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelect } from 'primeng/multiselect';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';

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

export interface LabelOption {
  label: string;
  value: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Textarea, FormsModule, MultiSelect, Tag, CommonModule, InputText],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task implements OnInit {
  ngOnInit(): void {
    const task = this.taskService.getSelectedTask();
    if (task && task.link) {
      task.links = [task.link];
      task.links = [...task.links];
      console.log(task)
    }
  }
  public taskService = inject(TaskService);
  public newLink: string = '';

  availableLabels: LabelOption[] = [
    { label: 'JavaScript', value: 'javascript', color: '#f7df1e', icon: 'pi pi-code' },
    { label: 'TypeScript', value: 'typescript', color: '#3178c6', icon: 'pi pi-code' },
    { label: 'Angular', value: 'angular', color: '#dd0031', icon: 'pi pi-cog' },
    { label: 'Backend', value: 'backend', color: '#68217a', icon: 'pi pi-server' },
    { label: 'Frontend', value: 'frontend', color: '#61dafb', icon: 'pi pi-desktop' },
    { label: 'Database', value: 'database', color: '#336791', icon: 'pi pi-database' },
    { label: 'DevOps', value: 'devops', color: '#ff6b35', icon: 'pi pi-cloud' },
    { label: 'Design', value: 'design', color: '#ff7c43', icon: 'pi pi-palette' },
    { label: 'Testing', value: 'testing', color: '#25c2a0', icon: 'pi pi-check-circle' },
    { label: 'Urgent', value: 'urgent', color: '#e74c3c', icon: 'pi pi-exclamation-triangle' },
    { label: 'Easy', value: 'easy', color: '#2ecc71', icon: 'pi pi-thumbs-up' },
    { label: 'Hard', value: 'hard', color: '#e67e22', icon: 'pi pi-star' }
  ];

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