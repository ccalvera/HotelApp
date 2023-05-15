import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hotel-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private readonly router: Router) {}

  goTo(site: any) {
    this.router.navigate([site]);
  }
}
