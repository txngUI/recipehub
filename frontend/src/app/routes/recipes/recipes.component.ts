import { Component } from '@angular/core';
import { RecipesMangamentComponent } from "./components/recipes-management/recipes-management.component";

@Component({
  selector: 'app-recipes',
  imports: [RecipesMangamentComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

}
