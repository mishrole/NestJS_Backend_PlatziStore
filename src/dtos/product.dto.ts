import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'; // Decoradores

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

// Validaciones opcionales basadas en CreateProductDto
export class UpdateProductDto extends PartialType(CreateProductDto) {
  // @IsString()
  // readonly name?: string;
  // @IsString()
  // readonly description?: string;
  // @IsNumber()
  // @IsPositive()
  // readonly price?: number;
  // @IsNumber()
  // @IsPositive()
  // readonly stock?: number;
  // @IsUrl()
  // readonly image?: string;
}
