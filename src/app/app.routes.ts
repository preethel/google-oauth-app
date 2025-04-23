import { Routes } from '@angular/router';
import { GoogleCallbackComponent } from './google-callback/google-callback.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'google-callback', component: GoogleCallbackComponent },
    { path: 'payment', component: PaymentComponent },
];
