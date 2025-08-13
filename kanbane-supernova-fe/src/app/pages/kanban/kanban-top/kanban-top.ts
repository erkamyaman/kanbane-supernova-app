import { Component } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';


@Component({
  selector: 'app-kanban-top',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule],
  templateUrl: './kanban-top.html',
  styleUrl: './kanban-top.scss',
})
export class KanbanTop { }
