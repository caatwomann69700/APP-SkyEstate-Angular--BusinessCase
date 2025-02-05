import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environements/environement';
import { IImage } from '../models/image.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = `${environment.apiBaseUrl}/images`; // URL API des images

  constructor(private http: HttpClient) {}

  // 📌 Méthode existante : Récupérer un objet image par son ID
  getImageById(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la récupération de l'image ID ${id}:`, error);
        return of({} as IImage);
      })
    );
  }

  // ✅ Nouvelle méthode : Récupérer directement l'URL d'une image par son ID
  getImageUrlById(id: number): Observable<string> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`).pipe(
      map(image => {
        if (image && image.name) {
          return `${environment.baseUrl}/${environment.assetsImages}${image.name}`; // ✅ URL correcte
        }
        return 'assets/Icones/default-image.jpg'; // ✅ Image par défaut
      }),
      catchError(error => {
        console.error(`❌ Erreur récupération image ID ${id}:`, error);
        return of('assets/Icones/default-image.jpg'); // ✅ Image par défaut en cas d'erreur
      })
    );
  }
}  