export interface Habitacion {
  id: string;
  costoBase: number;
  impuestos: number;
  tipo: string;
  habilitada: boolean;
  maxPersonas: number;
  ubicacion: string;
}
