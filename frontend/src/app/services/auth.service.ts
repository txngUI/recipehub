import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private userSubject = new BehaviorSubject<any>(null); // ✅ Ajout du BehaviorSubject pour stocker les données utilisateur
  user$ = this.userSubject.asObservable(); // ✅ Observable exposé pour écouter les changements utilisateur

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
            this.fetchUserData();
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
   * Récupère les données de l'utilisateur depuis le backend et les stocke dans le localStorage
   */
  fetchUserData() {
    const token = this.getToken();
    console.log('Token récupéré:', token);

    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers envoyés:', headers);

    this.http
      .get<any>('http://localhost:8080/api/user/me', { headers })
      .subscribe(
        (user) => {
          this.userSubject.next(user); // ✅ Met à jour l'utilisateur
          localStorage.setItem('user', JSON.stringify(user));
          console.log('User data fetched:', user);
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.logout(); // Optionally log out if error occurs
        }
      );
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
