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
    if (AuthorizationCode) {
      console.log('Google OAuth code:', AuthorizationCode);

      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsibWVtYmVyIiwibWFuYWdlciIsImNvbGxhYm9yYXRvciIsImFkbWluIl0sImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdHJpbmcgc3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJmYzQ1ZmJmYy0zZTFiLTRiOWItYjMxMy04MDE0MDcyZWI1ZGYiLCJPblBvaW50U2lnbldvcmtzcGFjZUlkIjoiMzZmY2ZhYjQtOGM1MS00YjMyLTk5ZDktNDE1ZjhmNWYwNmYxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYXphbTEzYmhAZ21haWwuY29tIiwiZXhwIjoxNzQ3MTM1MjQwfQ.nz_9jmbYH_qV31CtdvIdzFXb1BMqAEJw7ldnvgCEV6ivKrn7p_nz2hoUd7zlCzPK9w1wdf9E_5UYJ80GV4ia_nifuhqDMsMKdPRWv6-rtxnd3hIOkKWC3HCu8lxlyknEFbDJ6laOjJCENv1qoCtjtu4wT7Wi2sdVPgIDxUa4bp882x8HwXVmYzGAz7nTiUQp2UpsOd5zOHXNR1dnbuyc_2nYjbkknTLCL7-NJVlJmyBeD9M_nw9hRHFvVB9MtUB14uLA-nnfUuqjxdJt2ylKx8X1-wWmYCtcfT0PpdiFoD0tLWeM-eYFkwXTB-b2jW8r5JsshnjZmUufOK_s4hICaw');

      this.http.post('http://localhost:13000/google-meet/exchange-code', { AuthorizationCode }, { headers }).subscribe(() => {
        alert('Google login successful');
        this.router.navigate(['/']);
      });
    }
  }

}
