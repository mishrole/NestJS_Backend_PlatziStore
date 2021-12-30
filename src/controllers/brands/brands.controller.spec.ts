import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './../../services/brands/brands.service';
import { BrandsController } from './brands.controller';

describe('BrandsController', () => {
  let controller: BrandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService],
      controllers: [BrandsController],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
