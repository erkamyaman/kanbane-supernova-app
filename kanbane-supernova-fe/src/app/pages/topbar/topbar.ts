import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-topbar',
  imports: [PopoverModule, ButtonModule, ToggleSwitchModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {

}
