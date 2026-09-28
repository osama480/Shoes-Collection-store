import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
