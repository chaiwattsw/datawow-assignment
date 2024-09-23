import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createReservationDto: CreateReservationDto) {
    const concert = await this.prisma.concert.findUnique({
      where: { id: createReservationDto.concertId },
      include: { reservations: true },
    });

    if (!concert) {
      throw new NotFoundException('Concert not found');
    }

    if (concert.reservations.length >= concert.totalSeats) {
      throw new ForbiddenException('No seats available for this concert');
    }

    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        userId: userId,
        concertId: createReservationDto.concertId,
      },
    });

    if (existingReservation) {
      throw new ForbiddenException(
        'User already has a reservation for this concert',
      );
    }

    return this.prisma.reservation.create({
      data: {
        user: { connect: { id: userId } },
        concert: { connect: { id: createReservationDto.concertId } },
      },
      include: { user: true, concert: true },
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: { user: true, concert: true },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { concert: true },
    });
  }

  async remove(id: number) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // if (reservation.user.id !== userId) {
    //   throw new ForbiddenException('Cannot cancel reservation of another user');
    // }

    return this.prisma.reservation.delete({
      where: { id },
      include: { user: true, concert: true },
    });
  }
}
