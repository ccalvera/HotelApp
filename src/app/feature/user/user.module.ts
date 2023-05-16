import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NoContentComponent } from 'src/app/shared/components/no-content/no-content.component';
import { CustomPaginatorIntl } from 'src/app/shared/utils/paginator.intl';
import { FormDataComponent } from './components/reservation-data/form-data/form-data.component';
import { ReservationDataComponent } from './components/reservation-data/reservation-data.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserRoutingModule } from './user-routing.module';
@NgModule({
  declarations: [
    ReservationComponent,
    ReservationDataComponent,
    FormDataComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    NoContentComponent,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class UserModule {}
