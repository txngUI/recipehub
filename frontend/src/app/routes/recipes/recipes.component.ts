import { Component } from '@angular/core';
import { RecipesMangamentComponent } from "./components/recipes-management/recipes-management.component";
import { RecipesContentComponent } from './components/recipe-content/recipes-content.component';

@Component({
  selector: 'app-recipes',
  imports: [RecipesMangamentComponent, RecipesContentComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

}
