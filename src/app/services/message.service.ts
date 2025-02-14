import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMessage } from '../models/message.model';

import { AuthService } from './auth.service'; 

import { IUser } from '../models/user.model';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiBaseUrl}/messages`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // ✅ Récupérer les conversations d’un utilisateur
  getUserConversations(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/conversations`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Récupérer les messages entre deux utilisateurs
  getMessages(userId: number, selectedUserId: number): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(`${this.apiUrl}/chat/${selectedUserId}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(messages => messages.map(msg => ({
        ...msg,
        sender: typeof msg.sender === 'string' ? null : msg.sender, // 🔹 Corrige le problème des URLs renvoyées
        receiver: typeof msg.receiver === 'string' ? null : msg.receiver
      }))),
      map(messages => messages.sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()))
    );
  }
  
  // ✅ Envoyer un message
  sendMessage(message: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(`${this.apiUrl}/send`, message, {
      headers: this.getAuthHeaders(),
    });
  }
}