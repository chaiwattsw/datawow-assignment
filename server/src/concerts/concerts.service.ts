import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateConcertDto } from './dto/create-concert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Concert } from './entities/concert.entity';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  async create(createConcertDto: CreateConcertDto) {
    return this.prisma.concert.create({ data: createConcertDto });
  }

  async findAll() {
    return this.prisma.concert.findMany();
  }

  async findOne(id: number) {
    const concert = await this.prisma.concert.findUnique({ where: { id } });
    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return concert;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.concert.delete({ where: { id } });
  }
}
