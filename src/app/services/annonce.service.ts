import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAnnonce } from '../models/annonce.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = `${environment.apiBaseUrl}/annonces`;

  constructor(private http: HttpClient) {}

  getAnnonces(): Observable<IAnnonce[]> {
    return this.http.get<IAnnonce[]>(this.apiUrl).pipe(
      tap((data) => console.log('Données de l’API:', data)), // Vérifie si c'est bien un tableau
      catchError((error) => {
        console.error('Erreur API:', error);
        return of([]); // Retourne un tableau vide en cas d’erreur
      })
    );
  }
}
