import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  nuevoEndpoint(): string {
    return 'Soy nuevo';
  }

  // A comparación de express, con Nest funciona con o sin slash final
  @Get('/ruta/')
  ruta() {
    return 'con /.../';
  }

  @Get('products/:productId')
  getProduct(@Param('productId') id: string) {
    return `El productId es ${id}`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `El categoryId es ${categoryId} y el productId es ${productId}`;
  }
}
