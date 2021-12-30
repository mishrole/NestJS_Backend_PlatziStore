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
  // Query,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';
import { ParseIntPipe } from 'src/shared/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

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

  // @Get() // http://localhost:3000/products?brand=Prueba
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 50,
  //   @Query('brand') brand: string,
  // ) {
  //   // return {
  //   //   message: `Productos limit: ${limit} and offset: ${offset}. Productos brand: ${brand}`,
  //   // };
  //   return this.productsService.findAll();
  // }

  @Get() // http://localhost:3000/products
  getProducts() {
    return this.productsService.findAll();
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
  // Nota: Al manejar manualmente el response, evitamos que haga return del service automático, espera que lo hagamos manual
  @Get('express/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductExpress(@Res() response: Response, @Param('productId') id: string) {
    // Aunque el httpCode es 202, el response indica status 200
    response.status(200).send({
      message: `El productId es ${id}`,
    });
  }

  /* Los pipes permiten transformar y validar datos, sirven como tuberías con dos extremos: entrada y salida
    Además, los pipes pueden encadernarse, convirtiendo la salida de un pipe en la entrada de otro

    Son similares a un middleware en funcionamiento, sin embargo, los pipes se ejecutan en un orden de precedencia que esta mucho antes de llegar al request,
    mientras que el midleware esta solo justamente antes de entrar al end-point.
    */

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) id: number) {
    // return {
    //   message: `El productId es ${id}`,
    // };
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'acción de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  // Put edita completamente el modelo
  // Patch sólo edita parcialmente
  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   id,
    //   message: 'acción de actualizar',
    //   payload,
    // };
    return this.productsService.update(id, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) id: number) {
    // return {
    //   id,
    //   message: 'acción de eliminar',
    // };
    return this.productsService.delete(id);
  }
}
