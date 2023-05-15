import { Hotel } from '@admin/shared/interfaces/hotel';
import { HotelManagementService } from '@admin/shared/services/hotel-management.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsComponent } from './details/details.component';
import { Reserva } from '@admin/shared/interfaces/reserva';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  bookings: Reserva[] = [];
  bookingList!: MatTableDataSource<Reserva>;
  hotelsList!: Hotel[];
  displayedColumns: string[] = [
    'actions',
    'hotel',
    'location',
    'initialDate',
    'finishDate',
  ];
  constructor(
    private readonly hotelService: HotelManagementService,
    private readonly bookingDetailService: MatDialog
  ) {}

  ngOnInit() {
    this.getHotelList();
  }

  getHotelList() {
    this.hotelService.getHotelList().subscribe((hotels: Hotel[]) => {
      this.hotelsList = hotels;
      this.getBookings();
    });
  }

  getBookings() {
    this.hotelsList.forEach((hotel) => {
      if (hotel.reservas !== null) {
        hotel.reservas.map((reserva) => {
          this.bookings.push(reserva);
        });
      }
    });
    this.bookingList = new MatTableDataSource<Reserva>(this.bookings);
    this.bookingList.paginator = this.paginator;
    console.log(this.bookingList);
  }

  bookingDetails(hotel: Hotel) {
    this.bookingDetailService.open(DetailsComponent, {
      width: '700px',
      data: hotel,
    });
  }
  /**
   * filtro de hoteles
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookingList.filter = filterValue.trim().toLowerCase();
    if (this.bookingList.paginator) {
      this.bookingList.paginator.firstPage();
    }
  }
}
