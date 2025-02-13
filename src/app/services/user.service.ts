import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { IUser } from '../models/user.model';
import { AuthService } from './auth.service';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl; // Garde une seule déclaration
// ✅ Vérifier l'URL
 
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile(): Observable<IUser> {
    const token = this.authService.getToken();
    
    console.log("🔍 Token récupéré depuis localStorage:", token); // Vérifier le token
  
    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return throwError(() => new Error("⚠️ Utilisateur non authentifié"));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log("📡 Envoi de la requête GET vers :", `${this.apiUrl}/users/me`, headers); // Debug URL et Headers
  
    return this.http.get<IUser>(`${this.apiUrl}/users/me`, { headers });
  }
  
  
  updateUserData(userId: number, userData: Partial<IUser>): Observable<any> {
    const token = this.authService.getToken();
    
    if (!token) {
      console.error("❌ Erreur : Aucun token disponible !");
      throw new Error("⚠️ Utilisateur non authentifié");
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.put(`${this.apiUrl}/users/me`, userData, { headers }); // Correction de l'URL
  }
  
  

  createUser(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/users`, userData);
  }

  deleteUser(userId: number): Observable<void> {
    const token = this.authService.getToken();
    
    if (!token) {
      console.error("❌ Erreur : Aucun token disponible !");
      throw new Error("⚠️ Utilisateur non authentifié");
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`, { headers });
  }
}
