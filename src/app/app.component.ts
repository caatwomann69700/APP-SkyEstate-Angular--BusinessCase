import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AccessibilityComponent } from "./components/accessibility/accessibility.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Retirez l'import de BrowserModule
// import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SplashScreenComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Correction : "styleUrls" au lieu de "styleUrl"
})
export class AppComponent {
  title = 'colivio-frontend';
}
