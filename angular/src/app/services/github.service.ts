import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAuthUrl(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/github/auth-url`);
  }

  exchangeCodeForToken(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/github/callback?code=${code}`);
  }

  getUserStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/github/status`);
  }

  removeIntegration(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/auth/github/remove`);
  }
}
