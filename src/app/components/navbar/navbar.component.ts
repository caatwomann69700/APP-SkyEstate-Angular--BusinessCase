import { Component, HostListener } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen: boolean = false; // État du menu (fermé par défaut)

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; // Alterne entre ouvert et fermé
  }
  constructor(public authService: AuthService) {}

   // Variable pour suivre si la page a été scrollée
   isScrolled = false;

   // Écouteur d'événements pour le défilement
   @HostListener('window:scroll', [])
   onWindowScroll() {
     if (window.scrollY > 50) { // La valeur 50 peut être ajustée en fonction de votre besoin
       this.isScrolled = true;
     } else {
       this.isScrolled = false;
     }
}

texts: string[] = [
  "Bienvenue sur Sky Estate",
  "Avec Sky Estate vous trouviez le logement parfait pour vous",
  "Connectez-vous pour créer un compte chez nous et pouvoir mettre vos appartements en location"
];
textIndex: number = 0; // Index de la phrase actuelle
charIndex: number = 0; // Index du caractère actuel
typingSpeed: number = 100; // Vitesse d'écriture (en ms)
displayDuration: number = 2000; // Durée d'affichage avant de changer de phrase
displayedText: string = ''; // Texte affiché dans la pre-navbar

ngOnInit(): void {
  this.typeWriter();
}

typeWriter(): void {
  if (this.charIndex < this.texts[this.textIndex].length) {
    this.displayedText += this.texts[this.textIndex].charAt(this.charIndex);
    this.charIndex++;
    setTimeout(() => this.typeWriter(), this.typingSpeed);
  } else {
    setTimeout(() => this.eraseText(), this.displayDuration);
  }
}

eraseText(): void {
  if (this.charIndex > 0) {
    this.displayedText = this.texts[this.textIndex].substring(0, this.charIndex - 1);
    this.charIndex--;
    setTimeout(() => this.eraseText(), this.typingSpeed / 2);
  } else {
    this.textIndex = (this.textIndex + 1) % this.texts.length;
    setTimeout(() => this.typeWriter(), this.typingSpeed);
  }
}

isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

isAdmin(): boolean {
  return this.authService.isAdmin();
}

isUser(): boolean {
  return this.authService.isUser();
}

logout(): void {
  this.authService.logout();
}
}