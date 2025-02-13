import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user: IUser | null = null;
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log("Utilisateur récupéré :", data);
        this.user = data;
      },
      error: (err) => {
        console.error("❌ Erreur lors de la récupération du profil :", err);
        this.errorMessage = "⚠️ Impossible de récupérer les informations de l'utilisateur.";
      }
    });
  }
  

  onUpdate(form: NgForm): void {
    if (!this.user) return;

    const updatedData: Partial<IUser> = { ...this.user };

    // Vérifier si un mot de passe est fourni avant de l'envoyer
    if (this.newPassword.trim()) {
        updatedData.password = this.newPassword.trim();
    }

    this.userService.updateUserData(this.user.id!, updatedData).subscribe({
        next: () => {
            this.successMessage = "✅ Coordonnées mises à jour avec succès.";
            this.newPassword = ''; // Réinitialiser le champ mot de passe après modification
        },
        error: (err) => {
            console.error("❌ Erreur lors de la mise à jour :", err);
            this.errorMessage = "⚠️ Une erreur est survenue, veuillez réessayer.";
        }
    });
}

}