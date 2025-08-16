import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-topbar',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule, RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {

}
