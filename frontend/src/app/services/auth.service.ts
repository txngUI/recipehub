import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api/auth';

  /**
   * Envoie les identifiants de l'utilisateur au backend pour l'authentification
   * @param request - Contient username et password
   * @returns Observable avec la réponse contenant le token JWT
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  /**
   * Stocke le token JWT dans le localStorage
   * @param token - Token reçu après login
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Récupère le token JWT depuis le localStorage
   * @returns Le token ou null s'il n'existe pas
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }
  
  /**
   * Supprime le token JWT pour la déconnexion
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }
  
  register(user: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }  
}
