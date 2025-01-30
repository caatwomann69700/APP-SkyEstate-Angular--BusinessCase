import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';
import { IImage } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = `${environment.apiBaseUrl}/images`; // Utilisation de l'URL dynamique

  constructor(private http: HttpClient) {}

  // Récupérer toutes les images
  getImages(): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.apiUrl);
  }

  // Récupérer une image par ID
  getImageById(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`);
  }
}
