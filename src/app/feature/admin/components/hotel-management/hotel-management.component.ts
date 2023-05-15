import { Hotel } from '@admin/shared/interfaces/hotel';
import { HotelManagementService } from '@admin/shared/services/hotel-management.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { Router } from '@angular/router';
import { EditHotelService } from '@admin/shared/services/edit-hotel.service';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.scss'],
})
export class HotelManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hotelsList!: MatTableDataSource<Hotel>;
  displayedColumns: string[] = [
    'actions',
    'name',
    'location',
    'bookings',
    'state',
  ];

  constructor(
    private readonly editHotelService: EditHotelService,
    private readonly hotelService: HotelManagementService,
    private readonly sweetAlert: SweetAlertService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getHotelList();
  }

  getHotelList() {
    this.hotelService.getHotelList().subscribe((hotels: Hotel[]) => {
      this.hotelsList = new MatTableDataSource<Hotel>(hotels);
      this.hotelsList.paginator = this.paginator;
    });
  }

  /**
   * filtro de hoteles
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.hotelsList.filter = filterValue.trim().toLowerCase();
    if (this.hotelsList.paginator) {
      this.hotelsList.paginator.firstPage();
    }
  }

  editHotel(hotel: Hotel) {
    this.editHotelService.sentDataForm(hotel);
    this.router.navigate(['new']);
  }

  deleteHotel(hotel: Hotel) {
    this.sweetAlert
      .fire({
        title: '¿Estás seguro?',
        text: '¿En verdad deseas realizar esta acción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0D95D2',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: any) => {
        if (result.value) {
          this.hotelService.deleteHotel(hotel).subscribe(() => {
            this.getHotelList();
            this.sweetAlert.fireToast({
              title: 'Eliminación exitosa',
              icon: 'success',
            });
          });
        }
      });
  }
}
