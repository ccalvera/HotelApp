export interface Reserva {
  id: string;
  documento: number;
  nombreCompleto: string;
  hotel: string;
  ubicacion: string;
  fechaInicio: Date;
  fechaFin: Date;
  cantidadPersonas: number;
  valor: number;
}
