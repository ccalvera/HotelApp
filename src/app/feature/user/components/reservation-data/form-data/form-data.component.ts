import { Passenger } from '@admin/shared/interfaces/passenger';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type InitialData = {
  id: number;
  hotel: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  cantidadPersonas: number;
  valor: number;
};

type Document = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
})
export class FormDataComponent {
  reservationForm!: FormGroup;
  emergencyContactForm!: FormGroup;
  passengers: Passenger[] = [];
  initialData!: InitialData;

  documentType: Document[] = [
    { value: 'Cedula de ciudadania', viewValue: 'Cedula de ciudadania' },
    { value: 'Cedula de extranjeria', viewValue: 'Cedula de extranjeria' },
    { value: 'Pasaporte', viewValue: 'Pasaporte' },
    { value: 'Tarjeta de identidad', viewValue: 'Tarjeta de identidad' },
  ];

  getIterations(): number[] {
    return Array.from(
      { length: this.initialData.cantidadPersonas },
      (_, index) => index
    );
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InitialData
  ) {
    this.initialData = data;
  }

  ngOnInit(): void {
    this.validateEmergencyForm();
  }

  validateEmergencyForm() {
    this.emergencyContactForm = this.formBuilder.group({
      nombreCompleto: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
  }

  validateForm() {
    this.reservationForm = this.formBuilder.group({
      id: this.initialData.id,
      hotel: this.initialData.hotel,
      ubicacion: this.initialData.ubicacion,
      fechaInicio: this.initialData.fechaInicio,
      fechaFin: this.initialData.fechaFin,
      cantidadPersonas: this.initialData.cantidadPersonas,
      valor: this.initialData.valor,
      pasajeros: new FormControl([], Validators.required),
      contactoEmergencia: this.emergencyContactForm,
    });
  }

  reserve() {}
}
