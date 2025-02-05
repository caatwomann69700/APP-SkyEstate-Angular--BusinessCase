import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';
// Assurez-vous que le chemin est correct
import { catchError, map } from 'rxjs/operators';
import { IImageList } from '../models/imagelist.model';

@Injectable({
  providedIn: 'root',
})
export class ImageListService {
  private apiUrl = `${environment.apiBaseUrl}/imagelists`; // URL de base pour l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les images de la liste
  getImageLists(): Observable<IImageList[]> {
    return this.http.get<{ member: IImageList[] }>(this.apiUrl).pipe(
      map(response => response.member), // Extraire le tableau 'member' de la réponse
      catchError(this.handleError) // Gestion des erreurs
    );
  }
  getImagesByAnnonceId(annonceId: number, page: number = 1) {
    return this.http.get(`${this.apiUrl}/annonces/${annonceId}/images?page=${page}`);
  }
  
  // Récupérer une image par son ID
  getImageListById(id: number): Observable<IImageList> {
    return this.http.get<IImageList>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Créer une nouvelle image dans la liste
  createImageList(imageList: IImageList): Observable<IImageList> {
    return this.http.post<IImageList>(this.apiUrl, imageList).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Mettre à jour une image existante dans la liste
  updateImageList(id: number, imageList: IImageList): Observable<IImageList> {
    return this.http.put<IImageList>(`${this.apiUrl}/${id}`, imageList).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Supprimer une image de la liste
  deleteImageList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any): Observable<never> {
    console.error('Erreur dans la requête HTTP:', error);
    throw error;
  }
}
