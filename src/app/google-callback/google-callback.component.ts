import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-google-callback',
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    const AuthorizationCode = this.route.snapshot.queryParamMap.get('code');
    const RedirectUri = "http://localhost:4200/google-callback";
    if (AuthorizationCode) {
      console.log('Google OAuth code:', AuthorizationCode);

      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsibWVtYmVyIiwiY29sbGFib3JhdG9yIiwiYWRtaW4iLCJtYW5hZ2VyIl0sImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJSZWR3YW4gQXphbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDBhOTJmOWMtODg4Ni00NzY1LWJlNGItZjgyZjk2NDY2MjI5IiwiT25Qb2ludFNpZ25Xb3Jrc3BhY2VJZCI6IjI1ODQ5ODFjLTU5YjItNGRlYy1hYmZiLWYxYTJlNjYxMTBkMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImF6YW0xM2JoQGdtYWlsLmNvbSIsImV4cCI6MTc0NzUwNTE3OX0.AhW3p7Jc-aAwrGcp7P3x_Imn3i5TaqWg1pdrAiJQYUGl_BnOcDfOxxr93GXdh_MbnV_30h0COvIOwVEsyfBuBnWDfWkgecWJoOVD4Urvh8f6rnZNoY886B2Pbxw7TWiyVfXAaDeVbhDuKiOIBluyAKWkPakgfHRCES5_9Mx0WmhYOyiBDgMUpWVuHsWznUSR_xipimz6-Lb-okfHnBnd3rP6ddBFwFkRcFNQO8lqp4o3d9V6ceS5BJiqpqAWfzVtcHJFr0qsS6Xrx563gIodpafCWnKygTYk_foZGxxn84yFcDGalemfBV84PIjfZOnXhV7oQ1ZvN2B_jW8WmC-SQA');

      this.http.post('http://54.253.226.214:13000/google-meet/exchange-code', { AuthorizationCode, RedirectUri }, { headers }).subscribe(() => {
        alert('Google login successful');
        this.router.navigate(['/']);
      });
    }
  }

}
