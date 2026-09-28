import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  size: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
