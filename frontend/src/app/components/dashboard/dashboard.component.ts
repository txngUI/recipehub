import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getToken() ? 'User' : null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
