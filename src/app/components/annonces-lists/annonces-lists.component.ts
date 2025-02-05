import { Component, OnInit, HostListener } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
        this.annonces.forEach(annonce => {
          if (annonce.image) {
            const imageId = parseInt(annonce.image.split('/').pop() || '0', 10); // Extrait l'ID de l'image
          
            if (!isNaN(imageId) && imageId > 0) {
              this.imageService.getImageUrlById(imageId).subscribe(imageUrl => {
                annonce.imageUrl = imageUrl; // ✅ Stocke l'URL de l'image correctement
              });
            } else {
              annonce.imageUrl = 'assets/Icones/default-image.jpg'; // ✅ Image par défaut en cas d'erreur
            }
          }
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
