import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceService } from '../../services/annonce.service';
import { IAnnonce } from '../../models/annonce.model';
import { NgControlStatusGroup, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  annonces!: IAnnonce[]; // Utilisation de l'opérateur d'assertion non nulle

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe(
      (response) => {
        this.annonces = response.member;
      },
      (error) => {
        console.error('Error fetching annonces', error);
      }
    );
  }
}
