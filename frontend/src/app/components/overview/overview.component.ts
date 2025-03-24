import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState$.subscribe((isLoggedIn) => {
      this.username = isLoggedIn ? 'User' : null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

