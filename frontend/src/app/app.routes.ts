import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { MealProgramComponent } from './components/meal-program/meal-program.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RouterModule, RouterLink } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // ✅ Layout AVEC navbar
    children: [
      {
        path: 'shopping_list',
        component: ShoppingListComponent,
        canActivate: [AuthGuard],
      },{
        path: 'equipment',
        component: EquipmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'meal_program',
        component: MealProgramComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recipes',
        component: RecipesComponent,
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
