import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filtered-annonces',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filtered-annonces.component.html',
  styleUrls: ['./filtered-annonces.component.css']
})
export class FilteredAnnoncesComponent implements OnInit {
  annonces: IAnnonce[] = [];
  filters: any = {}; // Stocke les filtres récupérés

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters = params; // Récupère les filtres de l'URL
      this.loadAnnonces();
    });
  }

  loadAnnonces(): void {
    this.annonceService.searchAnnonces(this.filters).subscribe(
      (data) => {
        console.log('Annonces filtrées:', data);
        this.annonces = data['member'] || [];
      },
      (error) => console.error('Erreur chargement annonces', error)
    );
  }
}
