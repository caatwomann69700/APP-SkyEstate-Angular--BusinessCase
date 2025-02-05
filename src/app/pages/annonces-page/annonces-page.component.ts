import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { AnnoncesListsComponent } from "../../components/annonces-lists/annonces-lists.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annonce-page',
  standalone: true, 
  imports: [AnnoncesListsComponent, CommonModule], 
  templateUrl: './annonces-page.component.html',
  styleUrls: ['./annonces-page.component.css']
})
export class AnnoncesPageComponent implements OnInit {
  annonces: IAnnonce[] = [];
  fadeStates: boolean[] = []; // Déclarer fadeStates ici

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe((data) => {
      console.log('Données reçues :', data);
      if (Array.isArray(data.member)) {
        this.annonces = data.member; 
        this.fadeStates = new Array(this.annonces.length).fill(false); // Initialisation de fadeStates
      } else {
        console.error('Les données reçues ne contiennent pas de tableau dans la clé "member".');
      }
    });
  }
}
