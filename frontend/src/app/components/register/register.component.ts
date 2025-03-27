import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm'; // ✅ Corrigé

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // ✅ Ajouté pour éviter l'erreur sur NgIf
    ReactiveFormsModule, // ✅ Ajouté pour résoudre l'erreur sur formGroup
    HlmButtonModule,
    HlmFormFieldModule,
    HlmInputModule, // ✅ Remplace HlmInputDirective
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // ✅ Correction de "styleUrl"
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: RegisterComponent.passwordsMatchValidator }
  );

  static passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordsNotMatching: true }
      : null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log('Form invalid', this.registerForm.errors);
      return;
    }

    console.log('Registering with:', this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed!');
      },
    });
  }
}
