import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; // URL du back-end Spring Boot

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { email, password });
  }
}
