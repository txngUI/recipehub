import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
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
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.username = user ? user.username : null; 
    });

    if (this.authService.isAuthenticated()) {
      this.authService.fetchUserData(); // ✅ Charge les infos utilisateur si connecté
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

