// src/reservations/reservations.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.create(
      req.user.userId,
      createReservationDto,
    );
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get('my-reservations')
  async findAllByUser(@Request() req) {
    return this.reservationsService.findAllByUser(req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const reservation = await this.reservationsService.findAllByUser(
      req.user.userId,
    );
    if (!reservation.some((r) => r.id === id)) {
      throw new ForbiddenException('Cannot cancel reservation of another user');
    }
    return this.reservationsService.remove(id);
  }
}
