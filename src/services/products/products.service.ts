import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './../../models/product.entity';
import { CreateProductDto, UpdateProductDto } from './../../dtos/product.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción 1',
      price: 122,
      // image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    // Error first
    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: UpdateProductDto) {
    const productFound = this.findOne(id);

    if (!productFound) {
      throw new HttpException(
        `El producto con el id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    productFound.name = product.name;
    productFound.description = product.description;
    productFound.price = product.price;
    productFound.stock = product.stock;

    const productIndex = this.products.indexOf(productFound);
    this.products[productIndex] = productFound;
    return productFound;
  }

  delete(id: number) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }

    const productIndex = this.products.indexOf(product);
    this.products.splice(productIndex, 1);
    return `Producto ${id} eliminado`;
  }
}
