import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';
  loginAttempts: number = 0;
  isLocked: boolean = false;
  maxAttempts: number = 3;
  lockTime: number = 30 * 1000; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLockStatus();
  }

  onLogin(): void {
    if (this.isLocked) {
      return; 
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log("🔑 Token reçu :", response.token);

        const role = this.authService.getUserRole();
        console.log("👤 Rôle détecté :", role);

        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }

        this.resetAttempts(); 
      },
      error: () => {
        this.loginAttempts++;
        localStorage.setItem('loginAttempts', this.loginAttempts.toString());

        if (this.loginAttempts >= this.maxAttempts) {
          this.lockAccount();
        } else {
          this.errorMessage = `Email ou mot de passe incorrect (${this.loginAttempts}/${this.maxAttempts})`;
        }
      }
    });
  }

  checkLockStatus(): void {
    const lastLockTime = localStorage.getItem('lockTime');
    if (lastLockTime) {
      const elapsedTime = Date.now() - parseInt(lastLockTime, 10);
      if (elapsedTime < this.lockTime) {
        this.isLocked = true;
        setTimeout(() => {
          this.isLocked = false;
          localStorage.removeItem('lockTime');
        }, this.lockTime - elapsedTime);
      } else {
        localStorage.removeItem('lockTime');
      }
    }
  }

  lockAccount(): void {
    this.isLocked = true;
    localStorage.setItem('lockTime', Date.now().toString());
    this.errorMessage = `Trop de tentatives. Réessayez dans ${this.lockTime / 1000} secondes.`;
    setTimeout(() => {
      this.isLocked = false;
      this.resetAttempts();
    }, this.lockTime);
  }

  resetAttempts(): void {
    this.loginAttempts = 0;
    localStorage.removeItem('loginAttempts');
  }
}
