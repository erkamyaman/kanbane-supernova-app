import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTask } from '../../pages/tasks/create-task/create-task';

@Component({
  selector: 'app-topbar',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule, RouterLink, DynamicDialogModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  providers: [DialogService]
})
export class Topbar {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  openCreateTaskDialog() {
    this.ref = this.dialogService.open(CreateTask, {
      header: 'Create a new task',
      width: '400px',
      modal: true,
      closable: true,
      draggable: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        console.log('Dialog closed with:', result);
      }
    });
  }
}
