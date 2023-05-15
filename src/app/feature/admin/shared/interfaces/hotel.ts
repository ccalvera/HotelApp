import { Habitacion } from './habitacion';
import { Reserva } from './reserva';

export interface Hotel {
  id: string;
  nombre: string;
  ubicacion: string;
  habilitado: boolean;
  favorito: boolean;
  reservas: Reserva[];
  habitaciones: Habitacion[];
  noReservas?: number;
}
