import { Hotel } from '@admin/shared/interfaces/hotel';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { HotelService } from '@user/shared/services/hotel.service';
import { ReservationDataComponent } from '../reservation-data/reservation-data.component';
import { Reserva } from '@admin/shared/interfaces/reserva';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hotelList: Hotel[] = [];
  filterHotels: Hotel[] = [];
  filteredHotels!: MatTableDataSource<Hotel>;
  reservationForm!: FormGroup;
  searched: boolean = false;

  displayedColumns: string[] = ['hotel', 'location', 'actions'];

  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    if (d) {
      // Desactiva los días anteriores al día actual
      return d >= currentDate;
    }
    // Si no se proporciona una fecha, devuelve `true` para habilitarla
    return true;
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly hotelService: HotelService,
    private readonly sweetAlertService: SweetAlertService,
    private readonly reservationService: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHotels();
    this.validateForm();
  }

  public validateForm(): void {
    this.reservationForm = this.formBuilder.group({
      initDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      people: new FormControl(null, Validators.required),
      destination: new FormControl('', Validators.required),
    });
  }

  public getHotels(): void {
    this.hotelService.getHotelList().subscribe((hotels) => {
      this.hotelList = hotels;
    });
  }

  public findHotel() {
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.invalid) {
      this.sweetAlertService.fireToast({
        title: 'Ingrese todos los datos',
        icon: 'warning',
      });
      return;
    }
    this.filterHotels = this.hotelList.filter((hotel) => {
      if (
        hotel.habilitado &&
        hotel.ubicacion
          .toLocaleLowerCase()
          .includes(
            this.reservationForm.get('destination')?.value.toLocaleLowerCase()
          )
      ) {
        return hotel;
      }
      return;
    });
    if (this.filterHotels.length !== 0) {
      this.filteredHotels = new MatTableDataSource<Hotel>(this.filterHotels);
      this.filteredHotels.paginator = this.paginator;
    }
    this.searched = true;
  }

  public reserve(hotel: Hotel) {
    this.reservationService
      .open(ReservationDataComponent, {
        width: '1100px',
        data: [hotel, this.reservationForm.value],
      })
      .afterClosed()
      .subscribe((reservation: Reserva) => {
        if (reservation) {
          hotel.reservas.push(reservation);
          this.hotelService.editHotel(hotel).subscribe((res) => {
            console.log(res);
          });
          this.sweetAlertService.fireToast({
            title: 'Reserva realizada con éxito',
            text: 'Detalles enviados al correo electronico',
            icon: 'success',
          });
        }
      });
  }
}
