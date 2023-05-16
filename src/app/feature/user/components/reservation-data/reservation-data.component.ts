import { Habitacion } from '@admin/shared/interfaces/habitacion';
import { Hotel } from '@admin/shared/interfaces/hotel';
import { Reserva } from '@admin/shared/interfaces/reserva';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormDataComponent } from './form-data/form-data.component';

@Component({
  selector: 'app-reservation-data',
  templateUrl: './reservation-data.component.html',
  styleUrls: ['./reservation-data.component.scss'],
})
export class ReservationDataComponent {
  hotel!: Hotel;
  dataReservation!: any;
  reservation!: Reserva;
  reservationForm!: FormGroup;
  passengersForm!: FormGroup;
  reservationDays!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly reservationService: MatDialog,
    private readonly dialogRef: MatDialogRef<ReservationDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.hotel = data[0];
    this.dataReservation = data[1];
  }

  ngOnInit(): void {
    this.calculateDays();
  }

  private calculateDays() {
    const initDate = new Date(this.dataReservation.initDate);
    const finishDate = new Date(this.dataReservation.finishDate);
    const days =
      (finishDate.getTime() - initDate.getTime()) / (1000 * 3600 * 24);
    this.reservationDays = days;
  }

  public setReservationData(hotel: Hotel, room: Habitacion): void {
    this.reservationForm = this.formBuilder.group({
      id: new FormControl(),
      hotel: new FormControl(hotel.nombre),
      ubicacion: new FormControl(room.ubicacion),
      fechaInicio: new FormControl(this.dataReservation.initDate),
      fechaFin: new FormControl(this.dataReservation.finishDate),
      cantidadPersonas: new FormControl(this.dataReservation.people),
      valor: new FormControl(
        this.reservationDays * (room.costoBase + room.impuestos)
      ),
    });

    this.finishReservation(this.reservationForm.value);
  }

  public finishReservation(initialData: any) {
    this.reservationService
      .open(FormDataComponent, {
        width: '700px',
        data: initialData,
      })
      .afterClosed()
      .subscribe((reservation: Reserva) => {
        console.log(reservation);
      });
  }
}
