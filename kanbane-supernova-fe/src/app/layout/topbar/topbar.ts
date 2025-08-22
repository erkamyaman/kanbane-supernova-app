import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTask } from '../../pages/tasks/create-task/create-task';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-topbar',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule, DynamicDialogModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  providers: [DialogService]
})
export class Topbar implements OnInit {
  @ViewChild('op') op!: Popover;

  dialogService = inject(DialogService);
  themeService = inject(ThemeService);
  private router = inject(Router);

  destroyRef = inject(DestroyRef);

  ref: DynamicDialogRef | undefined;
  currentRoute: string = '';

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.router.url;
      console.log(this.currentRoute);
    });
  }

  ngOnInit() {}

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

  openTheOption(operation: string) {
    switch (operation) {
      case 'kanban':
        this.router.navigate(['/kanban']);
        break;
      case 'backlog':
        this.router.navigate(['/backlog']);
        break;
      case 'labels':
        //this.router.navigate(['/backlog']);
        break;
      case 'columns':
        //this.router.navigate(['/backlog']);
        break;
      case 'exportJSON':
        //this.router.navigate(['/backlog']);
        break;
      case 'importJSON':
        //this.router.navigate(['/backlog']);
        break;
      default:
        break;
    }
    this.op.hide();
  }
}
