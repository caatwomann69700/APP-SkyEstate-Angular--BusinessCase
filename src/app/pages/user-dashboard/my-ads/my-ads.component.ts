import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../../services/annonce.service';
import { AuthService } from '../../../services/auth.service';
import { IAnnonce } from '../../../models/annonce.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-ads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css'
})
export class MyAdsComponent implements OnInit {
  annonces: IAnnonce[] = [];
  userId: number | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private annonceService: AnnonceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserAds();
  }
  loadUserAds(): void {
    const user = this.authService.getUser();
  
    if (!user || !user.id) {
      console.error("🚨 Aucun utilisateur connecté !");
      this.errorMessage = "Utilisateur non connecté. Veuillez vous reconnecter.";
      this.isLoading = false;
      return;
    }
  
    this.userId = user.id;
    console.log("👤 Utilisateur connecté :", this.userId);
  
    this.annonceService.getAnnonces().subscribe(response => {
      console.log("📡 Annonces récupérées depuis l'API :", response);
  
      // 🔍 Vérifier le format des annonces récupérées
      response.member.forEach(annonce => {
        console.log(`🔍 Annonce ID: ${annonce.id}, annonce.user:`, annonce.user);
      });
  
      this.annonceService.getMyAnnonces().subscribe(response => {
        this.annonces = response.member;
        console.log("✅ Annonces après filtrage :", this.annonces);
      });
      
  
      console.log("✅ Annonces après filtrage :", this.annonces);
  
      this.isLoading = false;
      if (this.annonces.length === 0) {
        this.errorMessage = "Vous n'avez pas encore publié d'annonces.";
      }
    }, error => {
      console.error("❌ Erreur lors de la récupération des annonces :", error);
      this.errorMessage = "Une erreur s'est produite lors du chargement des annonces.";
      this.isLoading = false;
    });
  }}
  