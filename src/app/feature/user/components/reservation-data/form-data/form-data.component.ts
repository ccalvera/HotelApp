import { Passenger } from '@admin/shared/interfaces/passenger';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from '@core/services/sweet-alert.service';

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
  passengerForm!: FormGroup;

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
    private readonly sweetAlertService: SweetAlertService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InitialData
  ) {
    this.initialData = data;
  }

  ngOnInit(): void {
    this.validateEmergencyForm();
    this.initForm();
  }

  createFormItem(): FormGroup {
    return this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      documento: [undefined, Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  addFormItem() {
    const formArray = this.passengerForm.get('formArray') as FormArray;
    formArray.push(this.createFormItem());
  }

  initForm() {
    this.passengerForm = this.formBuilder.group({
      formArray: this.formBuilder.array([]),
    });
    for (let index = 0; index < this.initialData.cantidadPersonas; index++) {
      this.addFormItem();
    }
  }

  validateEmergencyForm() {
    this.emergencyContactForm = this.formBuilder.group({
      nombreCompleto: new FormControl(undefined, Validators.required),
      telefono: new FormControl(undefined, Validators.required),
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
      pasajeros: new FormControl([]),
      contactoEmergencia: new FormControl([]),
    });
  }

  reserve() {
    if (this.emergencyContactForm.invalid) {
      this.emergencyContactForm.markAllAsTouched();
      this.sweetAlertService.fireToast({
        title: 'Ingrese todos los datos',
        icon: 'warning',
      });
      return;
    }
    if (this.passengerForm.invalid) {
      this.sweetAlertService.fireToast({
        title: 'Ingrese todos los datos',
        icon: 'warning',
      });
      this.passengerForm.markAllAsTouched();
      return;
    }

    this.validateForm();
    this.reservationForm
      .get('pasajeros')
      ?.setValue(this.passengerForm.value.formArray);
    this.reservationForm
      .get('contactoEmergencia')
      ?.setValue([this.emergencyContactForm.value]);

    this.dialogRef.close(this.reservationForm.value);
  }
}
