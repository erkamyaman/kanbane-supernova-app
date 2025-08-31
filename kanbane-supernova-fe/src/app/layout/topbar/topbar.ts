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
import { KanbanService } from '../../services/kanban-service';
import { Column } from '../../pages/kanban/kanban-body/kanban-body';
import { SelectModule } from 'primeng/select';
import { Labels } from '../../pages/labels/labels';
import { Columns } from '../../pages/columns/columns';

@Component({
  selector: 'app-topbar',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule, DynamicDialogModule, FormsModule, SelectModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  providers: [DialogService]
})
export class Topbar implements OnInit {
  @ViewChild('op') op!: Popover;

  dialogService = inject(DialogService);
  themeService = inject(ThemeService);
  kanbanService = inject(KanbanService)
  private router = inject(Router);
  destroyRef = inject(DestroyRef);

  ref: DynamicDialogRef | undefined;
  currentRoute: string = '';

  columns: Column[] = [];

  kanbans: any[] = [
    { name: 'JavaScript', code: 'JS' },
    { name: 'TypeScript', code: 'TS' },
    { name: 'Angular', code: 'ANG' },
    { name: 'React', code: 'REACT' },
    { name: 'Vue.js', code: 'VUE' },
    { name: 'Node.js', code: 'NODE' },
    { name: 'Spring Boot', code: 'SPR' },
    { name: 'PostgreSQL', code: 'PSQL' },
    { name: 'Docker', code: 'DOCK' },
    { name: 'Kubernetes', code: 'K8S' }
  ];

  selectedKanban: any = this.kanbans[0];


  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit() {
    this.getColumns();
  }

  getColumns() {
    this.kanbanService.getColumns().subscribe({
      next: (data) => {
        this.columns = data
      }, error: (err) => {
        console.log('Cols fetching error');

      }, complete: () => {
        console.log('Cols fetching completed');
      }
    })
  }

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

  openLabelsDialog() {
    this.ref = this.dialogService.open(Labels, {
      header: 'Labels',
      width: '600px',
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

  openColumnsDialog() {
    this.ref = this.dialogService.open(Columns, {
      header: 'Columns',
      width: '600px',
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
        this.openLabelsDialog();
        break;
      case 'columns':
        this.openColumnsDialog();
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
