import { Reservation } from 'src/reservations/entities/reservation.entity';

export class Concert {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  reservations: Reservation[];
}
