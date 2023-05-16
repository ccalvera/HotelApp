import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NoContentComponent } from 'src/app/shared/components/no-content/no-content.component';
import { HabilitadoPipe } from 'src/app/shared/pipes/habilitado.pipe';
import { CustomPaginatorIntl } from 'src/app/shared/utils/paginator.intl';
import { AdminRoutingModule } from './admin-routing.module';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DetailsComponent } from './components/bookings/details/details.component';
import { CreateHotelComponent } from './components/create-hotel/create-hotel.component';
import { RoomsComponent } from './components/create-hotel/rooms/rooms.component';
import { HotelManagementComponent } from './components/hotel-management/hotel-management.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditHotelService } from './shared/services/edit-hotel.service';
import { HotelManagementService } from './shared/services/hotel-management.service';
import { LoginService } from './shared/services/login.service';
@NgModule({
  declarations: [
    LoginComponent,
    HotelManagementComponent,
    MenuComponent,
    CreateHotelComponent,
    RoomsComponent,
    BookingsComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSidenavModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NoContentComponent,
    HabilitadoPipe,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    MatPaginatorModule,
    MatDividerModule,
  ],
  providers: [
    HotelManagementService,
    LoginService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    EditHotelService,
  ],
  exports: [MenuComponent],
})
export class AdminModule {}
