import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // ✅ Layout AVEC navbar
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '/overview', pathMatch: 'full' }, // Redirection vers le tableau de bord
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent, // ✅ Layout SANS navbar
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: '/login' }, // ✅ Redirection en cas de route inconnue
];
