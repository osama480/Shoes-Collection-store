import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post()
  addItem(@CurrentUser('id') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(userId, dto);
  }

  @Delete(':itemId')
  removeItem(@CurrentUser('id') userId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(userId, itemId);
  }
}
