import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hotel-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public expanded = true;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();

    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }

  goTo(site: any) {
    this.router.navigate(['admin/' + site]);
  }

  finishSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
