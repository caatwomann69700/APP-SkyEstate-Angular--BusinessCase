import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAnnonce } from '../models/annonce.model';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = `${environment.apiBaseUrl}/annonces`;

  constructor(private http: HttpClient) {}

  // 📌 Lire toutes les annonces et construire les URLs d'images
  getAnnonces(): Observable<{ member: IAnnonce[] }> {
    return this.http.get<{ member: IAnnonce[] }>(this.apiUrl).pipe(
      tap(data => console.log('Données reçues :', data)),
      catchError(error => {
        console.error('Erreur API:', error);
        return of({ member: [] });
      })
    );
  }
  
  // Lire une annonce par son ID (Read)
  getAnnonceById(id: number): Observable<IAnnonce> {
    return this.http.get<IAnnonce>(`${this.apiUrl}/${id}`).pipe(
      map(annonce => ({
        ...annonce,
        imageUrl: annonce.image ? `${environment.baseUrl}/images/${annonce.image.split('/').pop()}` : 'assets/Icones/default-image.jpg'
      })),
      catchError(error => {
        console.error;
        return of({} as IAnnonce);
      })
    );
  }

  // 📌 Méthode pour récupérer les annonces filtrées
  searchAnnonces(filters: any): Observable<{ member: IAnnonce[] }> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]); // Ajoute les filtres si définis
      }
    });

    return this.http.get<{ member: IAnnonce[] }>(this.apiUrl, { params }).pipe(
      tap(data => console.log('Annonces filtrées:', data)),
      catchError(error => {
        console.error('Erreur API:', error);
        return of({ member: [] });
      })
    );
  }
}
