import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
  subtotal: number;
}

@Injectable()
export class CartService {
  private carts = new Map<string, CartItem[]>();

  constructor(private productsService: ProductsService) {}

  async getCart(userId: string): Promise<UserCart> {
    const items = this.carts.get(userId) || [];
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { userId, items, subtotal };
  }

  async addItem(userId: string, dto: AddToCartDto): Promise<UserCart> {
    const product = await this.productsService.findById(dto.productId);
    const items = this.carts.get(userId) || [];

    const existingIndex = items.findIndex(
      (i) => i.productId === dto.productId && i.size === dto.size && i.color === dto.color,
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += dto.quantity;
    } else {
      items.push({
        id: `ci_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        productName: product.name,
        image: product.images[0] || '',
        price: product.price,
        size: dto.size,
        color: dto.color,
        quantity: dto.quantity,
      });
    }

    this.carts.set(userId, items);
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string): Promise<UserCart> {
    let items = this.carts.get(userId) || [];
    items = items.filter((i) => i.id !== itemId);
    this.carts.set(userId, items);
    return this.getCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    this.carts.delete(userId);
  }
}
