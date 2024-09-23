import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';

import { NotFoundException } from '@nestjs/common';
import { Concert } from './entities/concert.entity';

describe('ConcertsController', () => {
  let controller: ConcertsController;
  let service: ConcertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
    service = module.get<ConcertsService>(ConcertsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(createConcertDto)).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createConcertDto);
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

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single concert', async () => {
      const expectedResult: Concert = {
        id: 1,
        name: 'Test Concert',
        description: 'A test concert',
        totalSeats: 100,
        reservations: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(await controller.findOne('1')).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if concert is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a concert', async () => {
      const expectedResult: Concert = {
        id: 1,
        name: 'Test Concert',
        description: 'A test concert',
        totalSeats: 100,
        reservations: [],
      };

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      expect(await controller.remove('1')).toBe(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if concert is not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
