import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: 'Running' | 'Basketball' | 'Casual' | 'Skateboarding' | 'Luxury';

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsArray()
  images: string[];

  @IsArray()
  sizes: { size: number; stock: number }[];

  @IsArray()
  colors: string[];

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
