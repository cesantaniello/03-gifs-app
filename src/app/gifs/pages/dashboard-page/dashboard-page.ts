import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuHeader } from "../../components/side-menu-header/side-menu-header";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuHeader],
  standalone: true,
  templateUrl: './dashboard-page.html',
})
export default class DashboardPageComponent { }
