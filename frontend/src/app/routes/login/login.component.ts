import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmButtonModule,
    HlmFormFieldModule,
    HlmInputDirective,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isDarkMode: any;
  constructor(private authService: AuthService, private router: Router) {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  request: LoginRequest = new LoginRequest();

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.request.username = this.userForm.value.username;
    this.request.password = this.userForm.value.password;

    this.authService.login(this.request).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token!);
        this.router.navigate(['/overview']);
      },
      error: () => {
        alert('Login failed!');
      },
    });
  }
}
