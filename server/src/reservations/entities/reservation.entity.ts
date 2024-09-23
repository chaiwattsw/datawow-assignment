import { Concert } from 'src/concerts/entities/concert.entity';
import { User } from 'src/users/entities/user.entity';

export class Reservation {
  id: number;
  user: User;
  concert: Concert;
  createdAt: Date;
}
