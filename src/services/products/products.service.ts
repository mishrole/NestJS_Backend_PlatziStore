import { Injectable } from '@nestjs/common';
import { Product } from './../../models/product.entity';

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
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Product) {
    const productFound = this.findOne(id);

    if (productFound) {
      productFound.name = product.name;
      productFound.description = product.description;
      productFound.price = product.price;
      productFound.stock = product.stock;

      const productIndex = this.products.indexOf(productFound);
      this.products[productIndex] = productFound;
      return productFound;
    }

    return `El producto con el id ${id} no existe`;
  }

  delete(id: number) {
    const productFound = this.findOne(id);
    const productIndex = this.products.indexOf(productFound);
    this.products.splice(productIndex, 1);
    return `Producto ${id} eliminado`;
  }
}
