import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required], // Ajout pour vérifier le mot de passe
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      birthdate: [''],
      phone: [''],
      gender: [''],
      address: [''],
      city: [''],
      country: ['']
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Inscription réussie ! Redirection vers la connexion...');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l’inscription';
      }
    });
  }
}
