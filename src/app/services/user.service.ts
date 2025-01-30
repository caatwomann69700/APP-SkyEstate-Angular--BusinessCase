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

  getUserData(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/me`);
  }

  updateUserData(userId: number, userData: Partial<IUser>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }
}
