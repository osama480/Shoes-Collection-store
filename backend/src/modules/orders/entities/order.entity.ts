export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
}

export class OrderEntity {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
