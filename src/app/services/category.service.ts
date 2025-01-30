import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';
import { ICategory } from '../models/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/categories`; // Utilisation de l'URL du fichier environnement

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  
getCategories(): Observable<ICategory[]> {
  return this.http.get<{ member: ICategory[] }>(`${environment.apiBaseUrl}/categories`).pipe(
    map(response => response.member) // 🔥 Extrait le tableau `member`
  );
}
  // Récupérer une catégorie par ID
  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`);
  }
}
