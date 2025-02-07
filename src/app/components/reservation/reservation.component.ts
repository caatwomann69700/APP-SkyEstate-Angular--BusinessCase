import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Importez vos modèles et services
import { ReservationService } from '../../services/reservation.service';
import { IReservation } from '../../models/reservation.model';
import { IReservationWrite } from '../../models/reservationwrite.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    
   
    CommonModule,
    ReactiveFormsModule,
    
    
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  // Assurez-vous d'importer CommonModule, ReactiveFormsModule, etc. (voir votre configuration actuelle)
})
export class ReservationComponent implements OnInit {

  // Recevez dynamiquement le prix de l'annonce et éventuellement la liste des réservations existantes
  @Input() annonceId!: number;
  @Input() price!: number;  // prix dynamique provenant de l'annonce
  @Input() reservationsForAnnonce: IReservation[] = [];

  reservationForm!: FormGroup;

  // Calculs basés sur le prix
  taxes: number = 0;
  serviceFees: number = 0;
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.initForm();
    this.calculateAmounts();
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      occupants: [1, [Validators.required, Validators.min(1)]]
    });
  }

  calculateAmounts(): void {
    // Calculer les montants en fonction du prix reçu en input
    this.taxes = parseFloat((this.price * 0.15).toFixed(2));
    this.serviceFees = parseFloat((this.price * 0.10).toFixed(2));
    this.totalAmount = this.price + this.taxes + this.serviceFees;
  }

  // Vous pouvez ajuster votre dateFilter pour désactiver les dates déjà réservées
  dateFilter = (d: Date | null): boolean => {
    if (!d) return true;
    const time = d.getTime();
    for (const res of this.reservationsForAnnonce) {
      const start = new Date(res.startDate).getTime();
      const end = new Date(res.endDate).getTime();
      if (time >= start && time <= end) {
        return false;
      }
    }
    return true;
  };

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }

    const selectedStart = this.reservationForm.value.startDate; // format "yyyy-mm-dd"
    const selectedEnd = this.reservationForm.value.endDate;

    // Convertir les dates en ISO string
    const startDateISO = new Date(selectedStart).toISOString();
    const endDateISO = new Date(selectedEnd).toISOString();

    const payload: IReservationWrite = {
      startDate: startDateISO,
      endDate: endDateISO,
      status: 'pending',
      taxes: this.taxes,
      serviceFees: this.serviceFees,
      annonce: `/api/annonces/${this.annonceId}`
    };

    this.reservationService.createReservation(payload).subscribe({
      next: (res) => {
        alert("Réservation créée avec succès !");
        // Rechargez éventuellement la liste des réservations si besoin
      },
      error: (err) => {
        console.error(err);
        alert("Une erreur s'est produite lors de la création de la réservation.");
      }
    });
  }
}
