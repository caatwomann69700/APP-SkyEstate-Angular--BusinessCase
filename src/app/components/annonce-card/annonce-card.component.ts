import { Component } from '@angular/core';
import { environment } from '../../../environements/environement';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IImage } from '../../models/image.model';

@Component({
  selector: 'app-annonce-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './annonce-card.component.html',
  styleUrl: './annonce-card.component.css'
})
export class AnnonceCardComponent {
  annonces: IAnnonce[] = [];
  imageBaseUrl: string = `${environment.baseUrl}/${environment.assetsImages}`;

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.fetchAnnonces();
  }

  private fetchAnnonces(): void {
    this.annonceService.getAnnonces().subscribe((data: any) => {
      console.log('Données reçues depuis l’API:', data); 
      if (data && Array.isArray(data.member)) {
        this.annonces = data.member.slice(0, 6); 
      } else {
        console.error('Erreur : La clé "member" est manquante ou incorrecte', data);
        this.annonces = []; 
      }
    });
  }
  getImageUrl(image: IImage | undefined): string {
    if (!image || !image.name) {
      return 'assets/Icones/default-image.jpg'; // ✅ Image par défaut
    }
  
    return `${environment.baseUrl}/images/${image.name}`; // ✅ URL correcte
  }
  
  
}  
