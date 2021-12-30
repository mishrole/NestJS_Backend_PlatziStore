import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { BrandsController } from './controllers/brands/brands.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    CustomersController,
    UsersController,
    OrdersController,
    BrandsController,
  ],
  providers: [AppService],
})
export class AppModule {}
