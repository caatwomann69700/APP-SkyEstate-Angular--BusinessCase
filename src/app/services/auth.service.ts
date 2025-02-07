import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environements/environement';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router'; // 🟢 Import du Router
import { IRegisterResponse } from '../models/register-response.model';
import { HttpHeaders } from '@angular/common/http';


interface ICredentials {
  email: string;
  password: string;
}

interface IAuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    roles: string[];
    lastname: string;
    firstname: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {} // 🟢 Injection du Router

  login(credentials: ICredentials): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/login_check`, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.user) {
            this.setToken(response.token);
            this.setUser(response.user);
            console.log("✅ Utilisateur stocké :", response.user);
          } else {
            console.warn("⚠️ Aucune information utilisateur reçue dans la réponse.");
          }
        })
      );
  }
  // ✅ Ajouter l'en-tête Authorization
  getUserData(): Observable<IUser> {
    const token = this.getToken();
    if (!token) {
      console.error("🚨 Aucun token trouvé !");
      return throwError(() => new Error("Aucun token trouvé"));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(`${this.apiUrl}/users/me`, { headers });
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("🚪 Déconnexion réussie. Redirection vers login.");
    this.router.navigate(['/login']); // 🟢 Ajout de la redirection vers la page de connexion
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser | null {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn("⚠️ Aucun utilisateur trouvé dans le stockage local.");
      return null;
    }
    try {
      return JSON.parse(userData) as IUser;
    } catch (error) {
      console.error("❌ Erreur lors du parsing des données utilisateur :", error);
      return null;
    }
  }

  getUserRole(): string | null {
    const user = this.getUser();
    if (!user || !user.roles || user.roles.length === 0) {
      console.error('⚠️ Aucun rôle utilisateur trouvé.');
      return null;
    }
    return user.roles.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user ? user.roles.includes('ROLE_ADMIN') : false;
  }
  
  isUser(): boolean {
    const user = this.getUser();
    return user ? user.roles.includes('ROLE_USER') : false;
  }

  register(userData: IUser): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${this.apiUrl}/register`, userData);
  }
  
  
}
