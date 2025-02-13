import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { AmenityService } from '../../services/amenity.service';
import { IAnnonce } from '../../models/annonce.model';
import { IAmenity } from '../../models/amenity.model';
import { IImageList } from '../../models/imagelist.model';
import { environment } from '../../../environements/environement';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from "../../components/reservation/reservation.component";
import { CoupDeCoeurComponent } from "../../components/coup-de-coeur/coup-de-coeur.component";

@Component({
  selector: 'app-annonce-detail',
  standalone: true, 
  imports: [CommonModule, ReservationComponent, CoupDeCoeurComponent],
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css'],
})
export class AnnonceDetailComponent implements OnInit {
  annonce: IAnnonce | null = null;
  amenitiesDetails: IAmenity[] = [];
  imagesList: IImageList[] = []; // ✅ Stocke la liste des images récupérées
  isLoading: boolean = true;
  errorMessage: string = '';
  urlImage: string = `${environment.baseUrl}/${environment.assetsImages}`;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private amenityService: AmenityService
  ) {}

  ngOnInit(): void {
    const annonceId = +this.route.snapshot.paramMap.get('id')!;

    this.annonceService.getAnnonceById(annonceId).subscribe(
      (data) => {
        this.annonce = data;
        this.isLoading = false;

        if (this.annonce.imagesList && this.annonce.imagesList.length > 0) {
          console.log("📸 Images List récupérée :", this.annonce.imagesList);
          this.imagesList = this.annonce.imagesList; // ✅ Stocke la liste des images
        }

        if (this.annonce.amenities && this.annonce.amenities.length > 0) {
          this.amenityService.getAmenitiesByAnnonce(this.annonce.amenities).subscribe(
            (amenities) => {
              console.log('🚀 Commodités récupérées:', amenities); 
              this.amenitiesDetails = amenities;
            }
          );
        }
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement de l'annonce.";
        this.isLoading = false;
      }
    );
  }
 
}
