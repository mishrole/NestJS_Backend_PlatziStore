import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  // Parámetros tipo Query
  // Enviar múltiples parámetros concatenados
  // Si no pasamos nada y no lo controlamos, es undefined
  // @Get('products') // http://localhost:3000/products?limit=100&offset=50
  // getProducts(@Query() params: any) {
  //   const { limit, offset } = params;
  //   return `Productos limit: ${limit} and offset: ${offset}`;
  // }

  /*
    Una vez se cumple con el principio de responsabilidad única,
    ya no hace falta indicar el nombre del endpoint porque este
    ya se encuentra nombrado en el decorador @Controller('products')
  */

  @Get() // http://localhost:3000/products?brand=Prueba
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand: string,
  ) {
    return `Productos limit: ${limit} and offset: ${offset}. Productos brand: ${brand}`;
  }

  // Error común : Este endpoint se cruza con getProduct por products/:id
  // La solución es mover los dinámicos al final (getProduct)
  @Get('filter') // http://localhost:3000/products/filter
  getProductsFilter() {
    return `Yo soy un filtro`;
  }

  // Endpoints dinámicos

  @Get(':productId')
  getProduct(@Param('productId') id: string) {
    return `El productId es ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }

  // Put edita completamente el modelo
  // Patch sólo edita parcialmente
  @Put(':productId')
  update(@Param('productId') id: string, @Body() payload: any) {
    return {
      id,
      message: 'acción de actualizar',
      payload,
    };
  }

  @Delete(':productId')
  delete(@Param('productId') id: string) {
    return id;
  }
}
