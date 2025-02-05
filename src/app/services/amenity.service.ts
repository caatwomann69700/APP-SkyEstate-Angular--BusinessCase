import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { IAmenity } from '../models/amenity.model';
import { environment } from '../../environements/environement';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AmenityService {
  private apiUrl = `${environment.apiBaseUrl}/amenities`;
  private imageBaseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  // 📌 Récupérer un équipement par ID
  getAmenityById(id: number): Observable<IAmenity> {
    return this.http.get<IAmenity>(`${this.apiUrl}/${id}`).pipe(
      map(amenity => {
        let iconUrl = null;
  
        if (amenity.icon && typeof amenity.icon === 'object' && 'name' in amenity.icon) {
          iconUrl = `${environment.baseUrl}/${environment.assetsIcons}${amenity.icon.name}`; // ✅ Correction ici
        } else if (typeof amenity.icon === 'string') {
          iconUrl = amenity.icon; // ✅ Si c'est déjà un string, on le garde
        }
  
        return {
          ...amenity,
          icon: iconUrl,
        } as IAmenity;
      }),
      catchError(error => {
        console.error(`Erreur API pour l'amenity ID ${id}:`, error);
        return of({} as IAmenity);
      })
    );
  }
  
  
  // 📌 Récupérer les équipements d'une annonce spécifique
  getAmenitiesByAnnonce(amenityUris: string[]): Observable<IAmenity[]> {
    if (!amenityUris || amenityUris.length === 0) {
      return of([]);
    }

    const requests = amenityUris.map(uri => {
      const id = parseInt(uri.split('/').pop()!, 10);
      return this.getAmenityById(id);
    });

    return forkJoin(requests).pipe(
      map(amenities => amenities.filter(amenity => amenity !== null))
    );
  }
  
}
