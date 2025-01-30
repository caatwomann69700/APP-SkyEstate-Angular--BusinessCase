import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environements/environement';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent implements OnInit {
  categories: ICategory[] = [];
  environment = environment;
  urlImage = `${environment.apiBaseUrl}/uploads/`; // URL pour récupérer les images

  constructor(private CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.CategoryService.getCategories().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.categories = data;
        } else {
          console.error("Les catégories ne sont pas un tableau :", data);
        }
      },
      error: (err) => console.error("Erreur lors du chargement des catégories", err)
    });
    
  }
}
