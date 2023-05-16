import { Habitacion } from '@admin/shared/interfaces/habitacion';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoomsComponent } from './rooms/rooms.component';
import { UpsertType } from 'src/app/shared/enums/upsert-type';
import { HotelManagementService } from '@admin/shared/services/hotel-management.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '@admin/shared/interfaces/hotel';
import { EditHotelService } from '@admin/shared/services/edit-hotel.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
})
export class CreateHotelComponent {
  hotelForm!: FormGroup;
  missingRoom = false;
  editMode = false;
  editData!: Hotel;

  get rooms(): Array<Habitacion> {
    return this.hotelForm.get('habitaciones')?.value || [];
  }

  constructor(
    private readonly hotelService: HotelManagementService,
    private readonly formBuilder: FormBuilder,
    private readonly registerRoomService: MatDialog,
    private readonly sweetAlert: SweetAlertService,
    private readonly router: Router,
    private readonly editHotelService: EditHotelService
  ) {}

  ngOnInit(): void {
    this.editHotelService.formData$.subscribe((data) => {
      if (data !== null) {
        this.editMode = true;
        this.editData = data;
      }
    });

    this.validateForm();
  }

  /**
   * Construcción y validación del formulario de registro de HIS.
   */
  public validateForm(): void {
    this.hotelForm = this.formBuilder.group({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      ubicacion: new FormControl(undefined, Validators.required),
      habilitado: new FormControl(true),
      reservas: new FormControl([]),
      habitaciones: new FormControl([], Validators.required),
    });

    this.editMode && this.patchValue();
  }

  patchValue() {
    this.hotelForm.patchValue({
      id: this.editData.id,
      nombre: this.editData.nombre,
      ubicacion: this.editData.ubicacion,
      habilitado: this.editData.habilitado,
      reservas: this.editData.reservas,
      habitaciones: this.editData.habitaciones,
    });
  }

  registerRoom() {
    this.registerRoomService
      .open(RoomsComponent, {
        data: { upsertType: UpsertType.New },
        width: '700px',
      })
      .afterClosed()
      .subscribe((room: Habitacion) => {
        if (room) {
          if (
            this.rooms.findIndex((r) => r.ubicacion === room.ubicacion) !== -1
          ) {
            this.sweetAlert.fireToast({
              title: 'Habitación existente',
              text: 'La ubicación ya se encuentra registrada',
              icon: 'error',
            });
            return;
          }
          this.missingRoom = true;
          this.rooms.push(room);
          this.hotelForm.get('habitaciones')?.setValue(this.rooms);
        }
      });
  }

  deleteRoom(habitacion: Habitacion) {
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
          const index = this.rooms.findIndex(
            (r) => r.ubicacion === habitacion.ubicacion
          );
          if (index !== -1) {
            this.rooms.splice(index, 1);
            this.hotelForm.get('habitaciones')?.setValue(this.rooms);
          }
          this.sweetAlert.fireToast({
            title: 'Eliminación exitosa',
            icon: 'success',
          });
        }
      });
  }

  editRoom(habitacion: Habitacion) {
    this.registerRoomService
      .open(RoomsComponent, {
        data: { habitacion, upsertType: UpsertType.Edit },
        width: '700px',
      })
      .afterClosed()
      .subscribe((room: Habitacion) => {
        if (room) {
          const existingIndex = this.rooms.findIndex(
            (r) => r.ubicacion === room.ubicacion
          );
          if (existingIndex !== -1) {
            this.rooms[existingIndex] = room;
          }
          this.hotelForm.get('habitaciones')?.setValue(this.rooms);
          this.sweetAlert.fireToast({
            title: 'Habitación editada',
            icon: 'success',
          });
        }
      });
  }

  registerHotel() {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      this.sweetAlert.fireToast({
        title: 'Formulario inválido',
        text: 'Por favor, verifica los campos del formulario',
        icon: 'error',
      });
      return;
    }
    if (this.hotelForm.valid) {
      this.hotelService
        .registerHotel(this.hotelForm.value)
        .subscribe((res: any) => {
          if (res) {
            this.sweetAlert.fireToast({
              title: 'Registro exitoso',
              icon: 'success',
            });
            this.hotelForm.reset();
            this.router.navigate(['admin/']);
          }
        });
    } else {
      this.sweetAlert.fireToast({
        title: 'Formulario inválido',
        text: 'Por favor, verifica los campos del formulario',
        icon: 'error',
      });
    }
  }
  editHotel() {
    this.hotelService.editHotel(this.hotelForm.value).subscribe(() => {
      this.hotelForm.reset();
      this.editHotelService.sentDataForm(null);
      this.router.navigate(['admin/']);
      this.sweetAlert.fireToast({
        title: 'Edición exitosa',
        icon: 'success',
      });
    });
  }

  cancel() {
    this.hotelForm.reset();
    this.editHotelService.sentDataForm(null);
    this.router.navigate(['admin/']);
  }
}
