import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationDataComponent } from './components/reservation-data/reservation-data.component';

@NgModule({
  declarations: [
    ReservationManagementComponent,
    ReservationComponent,
    ReservationDataComponent
  ],
  imports: [CommonModule],
})
export class UserModule {}
