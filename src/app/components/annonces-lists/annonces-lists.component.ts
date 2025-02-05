import { Component, OnInit, HostListener } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { environment } from '../../../environements/environement';
import { ImageService } from '../../services/image.service';


@Component({
  selector: 'app-annonces-lists',
  standalone: true, 
  imports: [CommonModule, RouterModule, RouterLink], 
  templateUrl: './annonces-lists.component.html',
  styleUrls: ['./annonces-lists.component.css']
})
export class AnnoncesListsComponent implements OnInit {
  annonces: IAnnonce[] = [];
  fadeStates: boolean[] = [];
  baseUrl = environment.baseUrl;
  assetsImages = environment.assetsImages;
  
  constructor(
    private annonceService: AnnonceService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe((data) => {
      console.log('📌 Données reçues depuis l\'API:', data);
      
      if (Array.isArray(data.member)) {
        this.annonces = data.member;

        // ✅ Récupère l'image de chaque annonce
        // ✅ Plus besoin d'extraire l'ID, on utilise directement le `name`
this.annonces.forEach(annonce => {
  annonce.imageUrl = annonce.image
    ? `${this.baseUrl}/${this.assetsImages}${annonce.image.name}`
    : 'assets/Icones/default-image.jpg';
});


      } else {
        console.error('❌ Erreur : les données reçues ne contiennent pas de tableau dans la clé "member".');
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const cards = document.querySelectorAll('.annonce-card');
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (rect.top + cardHeight / 50 < 0) {
        this.fadeStates[index] = true;
      } else {
        this.fadeStates[index] = false;
      }
    });
  }
}
