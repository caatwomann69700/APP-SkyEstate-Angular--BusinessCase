import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Lire les données d'un utilisateur (Read)
  getUserData(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/me`);
  }

  // Mettre à jour les données d'un utilisateur (Update)
  updateUserData(userId: number, userData: Partial<IUser>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }

  // Créer un nouvel utilisateur (Create)
  createUser(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/users`, userData);
  }

  // Supprimer un utilisateur (Delete)
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
