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

  // Lire toutes les annonces et construire les URLs d'images
  getAnnonces(): Observable<{ member: IAnnonce[] }> {
    return this.http.get<{ member: IAnnonce[] }>(this.apiUrl).pipe(
      tap(data => console.log('Données reçues :', data)),
      catchError(error => {
        console.error('Erreur API:', error);
        return of({ member: [] });
      })
    );
  }
  
  // Lire une annonce par son ID 
  getAnnonceById(id: number): Observable<IAnnonce> {
    return this.http.get<IAnnonce>(`${this.apiUrl}/${id}`).pipe(
      map(annonce => ({
        ...annonce,
        imageUrl: annonce.image && annonce.image.name
          ? `${environment.baseUrl}/images/${annonce.image.name}`
          : 'assets/Icones/default-image.jpg'
      })),
      catchError(error => {
        console.error('Erreur récupération annonce:', error);
        return of({} as IAnnonce);
      })
    );
  }
  
  getMyAnnonces(): Observable<{ member: IAnnonce[] }> {
    return this.http.get<{ member: IAnnonce[] }>(`${this.apiUrl}/mine`).pipe(
      tap(data => console.log('📡 Mes annonces reçues :', data)),
      catchError(error => {
        console.error('❌ Erreur récupération de mes annonces:', error);
        return of({ member: [] });
      })
    );
  }
  
  
  
  searchAnnonces(filters: any): Observable<{ member: IAnnonce[] }> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]); 
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

  // Ajouter une annonce
addAnnonce(annonce: IAnnonce): Observable<IAnnonce> {
  return this.http.post<IAnnonce>(this.apiUrl, annonce);
}

// Modifier une annonce
updateAnnonce(id: number, annonce: IAnnonce): Observable<IAnnonce> {
  return this.http.put<IAnnonce>(`${this.apiUrl}/${id}`, annonce);
}

// Supprimer une annonce
deleteAnnonce(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
