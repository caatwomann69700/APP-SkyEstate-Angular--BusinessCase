import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './accessibility-panel.component.html',
  styleUrls: ['./accessibility-panel.component.css']
})
export class AccessibilityPanelComponent {
  isPanelOpen: boolean = false;
  darkMode: boolean = false;
  textSize: number = 16;
  highContrast: boolean = false;
  defaultFontSize: number = 16; 
  fontSize: number = this.defaultFontSize;

  constructor(private cdr: ChangeDetectorRef) {} 

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  closePanel(): void {
    this.isPanelOpen = false;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    this.cdr.detectChanges(); // Force la mise à jour
  }

  increaseTextSize(): void {
    this.textSize += 2;
    document.documentElement.style.fontSize = `${this.textSize}px`;
  }

  decreaseTextSize(): void {
    if (this.textSize > 12) {
      this.textSize -= 2;
      document.documentElement.style.fontSize = `${this.textSize}px`;
    }
  }

  toggleHighContrast(): void {
    this.highContrast = !this.highContrast;
    document.body.classList.toggle('high-contrast', this.highContrast);
  }

  resetAccessibility(): void {
    this.darkMode = false;
    this.highContrast = false;
    this.fontSize = this.defaultFontSize;

    document.body.classList.remove('dark-mode', 'high-contrast');
    document.documentElement.style.fontSize = `${this.defaultFontSize}px`;
  }
}
