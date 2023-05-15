import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'no-content-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss'],
})
export class NoContentComponent {}
