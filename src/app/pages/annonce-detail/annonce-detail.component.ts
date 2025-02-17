import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { AmenityService } from '../../services/amenity.service';
import { UserService } from '../../services/user.service';
import { IAnnonce } from '../../models/annonce.model';
import { IAmenity } from '../../models/amenity.model';
import { IUser } from '../../models/user.model';
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
  imagesList: IImageList[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  urlImage: string = `${environment.baseUrl}/${environment.assetsImages}`;
  user: IUser | null = null; // ✅ Stocker l'utilisateur lié à l'annonce

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private amenityService: AmenityService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const annonceId = +this.route.snapshot.paramMap.get('id')!;

    this.annonceService.getAnnonceById(annonceId).subscribe({
      next: (data) => {
        this.annonce = data;
        this.isLoading = false;

        if (this.annonce.imagesList && this.annonce.imagesList.length > 0) {
          this.imagesList = this.annonce.imagesList;
        }

        if (this.annonce.amenities && this.annonce.amenities.length > 0) {
          this.amenityService.getAmenitiesByAnnonce(this.annonce.amenities).subscribe(
            (amenities) => {
              this.amenitiesDetails = amenities;
            }
          );
        }

        // ✅ Vérifier si `user` est un objet ou une URL
        if (typeof this.annonce.user === "string") {
          const userUrl = this.annonce.user;
          console.log("🔍 URL utilisateur détectée :", userUrl);

          this.userService.getUserByUrl(userUrl).subscribe({
            next: (userData) => {
              this.user = userData;
              console.log("👤 Utilisateur récupéré :", this.user);
            },
            error: (error) => {
              console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
            }
          });

        } else {
          this.user = this.annonce.user;
        }
      },
      error: (error) => {
        this.errorMessage = "Erreur lors du chargement de l'annonce.";
        this.isLoading = false;
        console.error("❌ Erreur lors de la récupération de l'annonce :", error);
      }
    });
  }
}
