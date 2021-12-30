import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './../../services/products/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
