import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51RG3SOI5rylF76AIlbJYq0hXA6gUtyuaLSEWMpuXFxrA9DYi4S79PXIPrqTf5vHqEeCU86lIA3vibJowoY9JtLBU00TJJyyyRg');

  constructor(private http: HttpClient) {}

  async getStripe() {
    return this.stripePromise;
  }

  createPaymentIntent(amount: number, currency: string, metadata: any) {
    return this.http.post<{ clientSecret: string }>('https://localhost:7129/api/Payment/create-intent', {
      amount,
      currency,
      metadata,
    });
  }

  subscribe(email: string, name: string, priceId: string) {
    return this.http.post<{ subscriptionId: string }>('https://localhost:7129/api/payment/subscribe', {
      email,
      name,
      priceId,
    });
  }
}
