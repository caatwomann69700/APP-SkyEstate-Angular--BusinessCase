import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css'
})

export class SplashScreenComponent implements OnInit {
  showSplash = true; // Contrôle l'affichage du splash screen

  ngOnInit(): void {
    // Masquer le splash screen après 3 secondes
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
