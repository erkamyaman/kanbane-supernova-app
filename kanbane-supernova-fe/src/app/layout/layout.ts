import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Topbar } from "./topbar/topbar";

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Topbar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
