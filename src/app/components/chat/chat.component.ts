import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  // Textes pour la pré-navbar
  texts: string[] = ["Bienvenue sur MySite !", "Découvrez nos services.", "Contactez-nous pour plus d'infos."];
  currentIndex: number = 0;
  currentText: string = '';
  isDeleting: boolean = false;
  charIndex: number = 0;

  // Vitesse d'animation
  speed: number = 150;

  ngOnInit(): void {
    this.startTypingEffect();
  }

  ngAfterViewInit(): void {
    this.initMessageAnimation();
  }

  // Typing effect pour la pré-navbar
  startTypingEffect(): void {
    const fullText = this.texts[this.currentIndex];
    const target = document.getElementById('changing-text');

    if (this.isDeleting) {
      this.currentText = fullText.substring(0, this.charIndex--);
    } else {
      this.currentText = fullText.substring(0, this.charIndex++);
    }

    if (target) {
      target.innerHTML = this.currentText;
    }

    if (!this.isDeleting && this.currentText === fullText) {
      setTimeout(() => (this.isDeleting = true), 2000); // Pause avant de supprimer
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.charIndex = 0;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    }

    setTimeout(() => this.startTypingEffect(), this.isDeleting ? this.speed / 2 : this.speed);
  }

  // Animation des messages
  initMessageAnimation(): void {
    const messages = document.querySelectorAll('.message');
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      messages.forEach((message) => {
        const rect = message.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom >= 0) {
          (message as HTMLElement).style.opacity = '1';
          (message as HTMLElement).style.transform = 'translateY(0)';
        } else {
          (message as HTMLElement).style.opacity = '0';
          (message as HTMLElement).style.transform = 'translateY(20px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
  }
}
