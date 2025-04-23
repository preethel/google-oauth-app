import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  card: any;
  clientSecret: string = '';
  cardErrors: string = '';
  processing: boolean = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51RGvYRQgCRkIUkVa69SSiciPMU60FV7IITpKpoNRKBep2dFVb5OIIqHqgQPRvb36eDQBjGiQSsjXpSpfUSxSwtId00zVBYJfRo'); // your publishable key

    const elements = this.stripe!.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');

    this.card.on('change', (event: any) => {
      this.cardErrors = event.error?.message || '';
    });
  }

  async pay() {
    this.processing = true;

    // Step 1: Call backend to get client_secret
    const response: any = await this.http.post('http://localhost:5173/api/Payment/create-intent', {
      amount: 5000, // $50.00 in cents
      currency: 'usd',
      metadata: { userId: '123' }
    }).toPromise();

    this.clientSecret = response.clientSecret;

    // Step 2: Confirm the card payment using Stripe.js
    const result = await this.stripe!.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card,
      }
    });

    if (result.error) {
      this.cardErrors = result.error.message!;
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        alert('Payment successful!');
      }
    }

    this.processing = false;
  }
}
