import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [NgIf],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.css'
})
export class AccessibilityComponent implements OnInit {
  isPanelOpen = false;
  fontSize = 16;
  darkMode = false;

  ngOnInit() {
    // Charger les préférences depuis le localStorage
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.fontSize = +(localStorage.getItem('fontSize') || 16);

    // Appliquer les préférences
    if (this.darkMode) document.body.classList.add('dark-mode');
    document.body.style.fontSize = `${this.fontSize}px`;
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  increaseFontSize() {
    this.fontSize += 2;
    document.body.style.fontSize = `${this.fontSize}px`;
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  decreaseFontSize() {
    if (this.fontSize > 10) {
      this.fontSize -= 2;
      document.body.style.fontSize = `${this.fontSize}px`;
      localStorage.setItem('fontSize', this.fontSize.toString());
    }
  }

  resetPreferences() {
    this.darkMode = false;
    this.fontSize = 16;

    document.body.classList.remove('dark-mode');
    document.body.style.fontSize = '16px';

    localStorage.removeItem('darkMode');
    localStorage.removeItem('fontSize');
  }
}