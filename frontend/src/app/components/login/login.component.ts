import { Component } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private integration: IntegrationService) {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  request: LoginRequest = new LoginRequest();

  login() {
    const formValue = this.userForm.value;

    if (formValue.username == '' || formValue.password == '') {
      alert('Wrong Credentials');
      return;
    }

    this.request.username = formValue.username;
    this.request.password = formValue.password;

    this.integration.doLogin(this.request).subscribe({
      next: (res) => {
        console.log('Received Response:' + res.token);
      },
      error: (err) => {
        console.log('Error Received Response:' + err);
      },
    });
  }
}
