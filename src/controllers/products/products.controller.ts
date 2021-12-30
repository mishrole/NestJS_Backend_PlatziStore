import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

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
    return {
      message: `Productos limit: ${limit} and offset: ${offset}. Productos brand: ${brand}`,
    };
  }

  // Error común : Este endpoint se cruza con getProduct por products/:id
  // La solución es mover los dinámicos al final (getProduct)
  @Get('filter') // http://localhost:3000/products/filter
  getProductsFilter() {
    return {
      message: `Yo soy un filtro`,
    };
  }

  // Endpoints dinámicos

  //Si necesito manejar directamente el response de express
  // No es recomendable, lo ideal es usar decoradores, pero es bueno saber que se puede hacer
  @Get('express/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductExpress(@Res() response: Response, @Param('productId') id: string) {
    // Aunque el httpCode es 202, el response indica status 200
    response.status(200).send({
      message: `El productId es ${id}`,
    });
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') id: string) {
    return {
      message: `El productId es ${id}`,
    };
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
    return {
      id,
      message: 'acción de eliminar',
    };
  }
}
