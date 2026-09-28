import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async processPayment(amount: number, paymentMethod: string) {
    // Simulated payment gateway response (e.g. Stripe, PayPal, Card)
    return {
      success: true,
      transactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      amount,
      paymentMethod,
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
    };
  }
}
