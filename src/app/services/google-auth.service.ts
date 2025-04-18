import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor() { }
  private clientId = '400798089060-ffr8430p7lc5gkd83qolb7mtoeb40ajs.apps.googleusercontent.com';
  private redirectUri = 'http://localhost:4200/google-callback';

  loginWithGoogle(): void {
    const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar');
    const responseType = 'code';
    const accessType = 'offline';
    const prompt = 'consent';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;
    
    window.location.href = url;
  }
}
