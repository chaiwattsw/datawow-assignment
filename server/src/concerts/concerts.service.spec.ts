import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsService } from './concerts.service';
import { PrismaService } from '../prisma.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './concert.entity';
import { NotFoundException } from '@nestjs/common';

describe('ConcertsService', () => {
  let service: ConcertsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: PrismaService,
          useValue: {
            concert: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new concert', async () => {
      const createConcertDto: CreateConcertDto = {
        name: 'Test Concert',
        description: 'A test concert',
        totalSeats: 100,
      };
      const expectedResult: Concert = {
        id: 1,
        ...createConcertDto,
        reservations: [],
      };

      jest
        .spyOn(prismaService.concert, 'create')
        .mockResolvedValue(expectedResult);

      expect(await service.create(createConcertDto)).toBe(expectedResult);
      expect(prismaService.concert.create).toHaveBeenCalledWith({
        data: createConcertDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of concerts', async () => {
      const expectedResult: Concert[] = [
        {
          id: 1,
          name: 'Concert 1',
          description: 'Description 1',
          totalSeats: 100,
          reservations: [],
        },
        {
          id: 2,
          name: 'Concert 2',
          description: 'Description 2',
          totalSeats: 200,
          reservations: [],
        },
      ];

      jest
        .spyOn(prismaService.concert, 'findMany')
        .mockResolvedValue(expectedResult);

      expect(await service.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single concert if found', async () => {
      const expectedResult: Concert = {
        id: 1,
        name: 'Test Concert',
        description: 'A test concert',
        totalSeats: 100,
        reservations: [],
      };

      jest
        .spyOn(prismaService.concert, 'findUnique')
        .mockResolvedValue(expectedResult);

      expect(await service.findOne(1)).toBe(expectedResult);
      expect(prismaService.concert.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if concert is not found', async () => {
      jest.spyOn(prismaService.concert, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a concert if found', async () => {
      const expectedResult: Concert = {
        id: 1,
        name: 'Test Concert',
        description: 'A test concert',
        totalSeats: 100,
        reservations: [],
      };

      jest
        .spyOn(prismaService.concert, 'findUnique')
        .mockResolvedValue(expectedResult);
      jest
        .spyOn(prismaService.concert, 'delete')
        .mockResolvedValue(expectedResult);

      expect(await service.remove(1)).toBe(expectedResult);
      expect(prismaService.concert.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if concert is not found', async () => {
      jest.spyOn(prismaService.concert, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
