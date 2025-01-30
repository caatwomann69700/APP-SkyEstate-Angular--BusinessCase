import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AccessibilityComponent } from "./components/accessibility/accessibility.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, AccessibilityComponent, FooterComponent, SplashScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'colivio-frontend';
}
