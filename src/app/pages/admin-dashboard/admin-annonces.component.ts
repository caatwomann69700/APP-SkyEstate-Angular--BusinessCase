import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { CommonModule } from '@angular/common'; // Ajouté pour ngFor
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-annonces',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajout du CommonModule
  templateUrl: './admin-annonces.component.html',
  styleUrls: ['./admin-annonces.component.css']
})
export class AdminAnnoncesComponent implements OnInit {
  annonces: IAnnonce[] = [];

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces(): void {
    this.annonceService.getAnnonces().subscribe({
      next: (data) => {
        this.annonces = data.member;
      },
      error: (err) => console.error('Erreur lors du chargement des annonces', err)
    });
  }

  deleteAnnonce(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.annonceService.deleteAnnonce(id).subscribe({
        next: () => {
          this.annonces = this.annonces.filter(annonce => annonce.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
