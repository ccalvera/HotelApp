import { EmergencyContact } from './emergency-contact';
import { Passenger } from './passenger';

export interface Reserva {
  id: string;
  hotel: string;
  ubicacion: string;
  fechaInicio: Date;
  fechaFin: Date;
  cantidadPersonas: number;
  valor: number;
  pasajeros: Passenger[];
  contactoEmergencia: EmergencyContact[];
}
