import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
  });

  fireToast(options: SweetAlertOptions): void {
    this.toast.fire(options);
  }

  fire(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  fireToastTimer(options: SweetAlertOptions): void {
    this.toast.fire({
      ...options,
    });
  }

  deleteConfirmation(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
  }

  confirmation(
    title: string,
    text: string,
    buttonText: string
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: buttonText,
    });
  }
}
