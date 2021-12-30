import { Controller, Get, Param, Query } from '@nestjs/common';
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

  // Parámetros tipo Query
  // Enviar múltiples parámetros concatenados
  // Si no pasamos nada y no lo controlamos, es undefined
  // @Get('products') // http://localhost:3000/products?limit=100&offset=50
  // getProducts(@Query() params: any) {
  //   const { limit, offset } = params;
  //   return `Productos limit: ${limit} and offset: ${offset}`;
  // }

  @Get('products') // http://localhost:3000/products?brand=Prueba
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand: string,
  ) {
    return `Productos limit: ${limit} and offset: ${offset}. Productos brand: ${brand}`;
  }

  // Error común : Este endpoint se cruza con getProduct por products/:id
  // La solución es mover los dinámicos al final (getProduct)
  @Get('products/filter') // http://localhost:3000/products/filter
  getProductsFilter() {
    return `Yo soy un filtro`;
  }

  // Endpoints dinámicos

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
