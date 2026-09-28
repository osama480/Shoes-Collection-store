import { IsString, IsNotEmpty, IsObject, IsEmail } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsObject()
  @IsNotEmpty()
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
