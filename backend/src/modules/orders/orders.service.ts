import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  private orders: OrderEntity[] = [
    {
      id: 'ord_101',
      userId: 'usr_2',
      customerName: 'Muhammad Ali',
      customerEmail: 'ali@gmail.com',
      phoneNumber: '+92 300 1234567',
      items: [
        {
          productId: 'sh_1',
          productName: 'Bata Power Sport Runner',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
          price: 4500,
          size: 9,
          color: 'Black / Orange',
          quantity: 1,
        },
      ],
      totalAmount: 4500,
      status: OrderStatus.PENDING,
      shippingAddress: {
        street: 'House 42, Block B, Model Town',
        city: 'Lahore',
        state: 'Punjab',
        zipCode: '54000',
        country: 'Pakistan',
      },
      paymentMethod: 'Cash on Delivery',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor(private cartService: CartService) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<OrderEntity> {
    const userCart = await this.cartService.getCart(userId);
    if (!userCart.items || userCart.items.length === 0) {
      throw new BadRequestException('Cannot create an order with an empty cart');
    }

    const newOrder: OrderEntity = {
      id: `ord_${Date.now()}`,
      userId,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      phoneNumber: dto.phoneNumber,
      items: [...userCart.items],
      totalAmount: userCart.subtotal,
      status: OrderStatus.PENDING,
      shippingAddress: dto.shippingAddress,
      paymentMethod: dto.paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.unshift(newOrder);
    await this.cartService.clearCart(userId);
    return newOrder;
  }

  async findUserOrders(userId: string): Promise<OrderEntity[]> {
    return this.orders.filter((o) => o.userId === userId);
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orders;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<OrderEntity> {
    const order = await this.findById(id);
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }
}
