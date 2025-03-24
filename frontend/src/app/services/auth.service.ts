import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated()); // ✅ Utilisation de la méthode existante

  constructor(private http: HttpClient) {}

  /**
   * Expose un Observable pour suivre l'état de l'authentification
   */
  authState$ = this.authState.asObservable();

  /**
   * Envoie les identifiants de l'utilisateur au backend pour l'authentification
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    return new Observable((observer) => {
      this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).subscribe({
        next: (response) => {
          if (response.token) {
            this.saveToken(response.token);
          } else {
            observer.error(new Error('Token is undefined'));
          }
          this.authState.next(true); // ✅ Mise à jour de l'état d'authentification
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  /**
   * Récupère le token JWT depuis le localStorage
   * @returns Le token ou null s'il n'existe pas
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Stocke le token JWT dans le localStorage et met à jour l'état d'authentification
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.authState.next(true);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Déconnecte l'utilisateur en supprimant le token et en mettant à jour l'état
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  register(user: { username: string; email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
