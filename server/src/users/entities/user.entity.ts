import { Reservation } from 'src/reservations/entities/reservation.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class User {
  id: number;
  email: string;
  password: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  reservations?: Reservation[];
}
