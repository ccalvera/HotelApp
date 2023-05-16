import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagementComponent } from './components/hotel-management/hotel-management.component';
import { LoginComponent } from './components/login/login.component';
import { CreateHotelComponent } from './components/create-hotel/create-hotel.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  {
    path: '',
    component: HotelManagementComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'new',
    component: CreateHotelComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [SecurityGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
