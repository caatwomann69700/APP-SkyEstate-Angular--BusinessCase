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
  private apiUrl = `${environment.apiBaseUrl}/categories`; 
  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getCategories(): Observable<ICategory[]> {
    return this.http.get<{ member: ICategory[] }>(`${this.apiUrl}`).pipe(
      map(response => response.member) 
    );
  }

  // Récupérer une catégorie par ID
  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle catégorie
  createCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.apiUrl}`, category);
  }

  // Mettre à jour une catégorie existante
  updateCategory(id: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/${id}`, category);
  }

  // Supprimer une catégorie
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
