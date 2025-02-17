import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.model';
import { CommonModule, NgIf } from '@angular/common';
import { NgModel, NgModelGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user: IUser | null = null; // Stocker l'utilisateur
  isSidebarOpen: boolean = true;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

   // Méthode pour basculer l'affichage de la sidebar
   toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }  

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        console.log("✅ Utilisateur récupéré :", this.user);
      },
      error: (err) => {
        console.error("❌ Erreur lors de la récupération de l'utilisateur :", err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}


