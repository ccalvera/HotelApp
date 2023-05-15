import { Habitacion } from '@admin/shared/interfaces/habitacion';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpsertType } from 'src/app/shared/enums/upsert-type';

type DialogData = {
  habitacion?: Habitacion;
  upsertType: UpsertType;
};

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  form!: FormGroup;
  upsertType: UpsertType;
  title: string;
  room!: Habitacion;

  get editMode(): boolean {
    return this.upsertType === UpsertType.Edit;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.upsertType = data.upsertType;
    this.editMode && (this.room = data.habitacion!);
    this.title = this.editMode ? 'Editar habitación' : 'Registrar habitación';
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      costoBase: new FormControl(undefined, Validators.required),
      impuestos: new FormControl(undefined, Validators.required),
      tipo: new FormControl('', Validators.required),
      habilitada: new FormControl(true, Validators.required),
      maxPersonas: new FormControl(undefined, Validators.required),
      ubicacion: new FormControl(
        { value: '', disabled: this.editMode },
        Validators.required
      ),
    });
    this.editMode && this.patchValue();
  }

  patchValue() {
    this.form.patchValue({
      costoBase: this.room.costoBase,
      impuestos: this.room.impuestos,
      tipo: this.room.tipo,
      habilitada: this.room.habilitada,
      maxPersonas: this.room.maxPersonas,
      ubicacion: this.room.ubicacion,
    });
  }

  addRoom() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.editMode) {
      this.form.value.ubicacion = this.room.ubicacion;
    }
    this.dialogRef.close(this.form.value);
  }
}
