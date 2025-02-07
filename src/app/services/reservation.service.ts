import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IReservation } from '../models/reservation.model';
import { environment } from '../../environements/environement';
import { IReservationWrite } from '../models/reservationwrite.model';

// Interface pour le résultat de la collection retournée par l'API Platform
interface IReservationCollection {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: IReservation[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${environment.apiBaseUrl}/reservations`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère une page de réservations.
   * @param page Numéro de page (par défaut 1)
   */
  getReservations(page: number = 1): Observable<IReservation[]> {
    return this.http.get<IReservationCollection>(`${this.apiUrl}?page=${page}`)
      .pipe(
        // On extrait le tableau des réservations contenu dans "member"
        map(response => response.member),
        catchError(this.handleError)
      );
  }
  getReservationsByAnnonce(annonceId: number, page: number = 1): Observable<IReservation[]> {
    const url = `${this.apiUrl}?annonce.id=${annonceId}&page=${page}`;
    return this.http.get<IReservationCollection>(url)
      .pipe(
        map(response => response.member),
        catchError(this.handleError)
      );
  }
  
  /**
   * Récupère une réservation par son id.
   * @param id L'identifiant de la réservation
   */
  getReservation(id: number): Observable<IReservation> {
    return this.http.get<IReservation>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crée une nouvelle réservation.
   * @param reservation Les données de la réservation à créer
   */
  createReservation(reservation: IReservationWrite): Observable<IReservation> {
    return this.http.post<IReservation>(this.apiUrl, reservation)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  /**
   * Met à jour une réservation existante.
   * @param reservation L'objet réservation mis à jour
   */
  updateReservation(reservation: IReservation): Observable<IReservation> {
    return this.http.put<IReservation>(`${this.apiUrl}/${reservation.id}`, reservation)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Supprime une réservation.
   * @param id L'identifiant de la réservation à supprimer
   */
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Méthode de gestion des erreurs.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erreur inconnue !';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
