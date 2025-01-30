import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user: IUser | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des données utilisateur :", err);
        this.errorMessage = "⚠️ Vous devez être connecté pour voir votre profil.";
      }
    });
  }

  onUpdate(form: NgForm): void {
    if (!this.user) return;

    this.userService.updateUserData(this.user.id!, this.user).subscribe({
      next: () => {
        this.successMessage = "✅ Coordonnées mises à jour avec succès.";
      },
      error: (err) => {
        console.error("❌ Erreur lors de la mise à jour :", err);
        this.errorMessage = "⚠️ Une erreur est survenue, veuillez réessayer.";
      }
    });
  }
}
