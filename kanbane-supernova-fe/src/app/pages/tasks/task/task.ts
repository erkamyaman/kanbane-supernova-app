import { Component, inject } from '@angular/core';
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

// Update your Task interface
export interface Task {
  id: string;
  name: string;
  definition: string;
  link?: string; // Keep for backward compatibility
  links?: string[]; // New multiple links array
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
  imports: [DrawerModule, ButtonModule, Textarea, FormsModule, FloatLabel, MultiSelect, Tag, CommonModule, InputText],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  public taskService = inject(TaskService);
  public newLink: string = '';

  // Available label options with icons
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

  // Get the current selected task
  get task(): Task {
    const task = this.taskService.getSelectedTask();
    // Migrate old single link to links array if needed
    if (task && task.link && (!task.links || task.links.length === 0)) {
      task.links = [task.link];
      // Force change detection by creating a new array reference
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

  // Get color for a specific label
  getLabelColor(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.color || '#6c757d'; // Default gray color
  }

  // Get icon for a specific label
  getLabelIcon(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.icon || 'pi pi-tag'; // Default tag icon
  }

  // Get display name for a specific label
  getLabelDisplayName(labelValue: string): string {
    const labelOption = this.availableLabels.find(option => option.value === labelValue);
    return labelOption?.label || labelValue;
  }

  // Add new link
  addLink() {
    if (this.newLink && this.isValidUrl(this.newLink)) {
      const task = this.task;
      if (!task.links) {
        task.links = [];
      }
      task.links.push(this.newLink);
      // Force change detection by creating a new array reference
      task.links = [...task.links];
      this.newLink = '';
    }
  }

  // Remove link by index
  removeLink(index: number) {
    const task = this.task;
    if (task.links && task.links.length > index) {
      task.links.splice(index, 1);
      // Force change detection by creating a new array reference
      task.links = [...task.links];
    }
  }

  // Simple URL validation
  isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}