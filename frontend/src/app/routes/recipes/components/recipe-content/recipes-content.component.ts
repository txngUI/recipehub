import { Component } from '@angular/core';
import { LucideAngularModule, Heart, CirclePlus, Clock } from 'lucide-angular';
import { SearchBarComponent } from "../../../../shared/search-bar/search-bar.component";

@Component({
  selector: 'app-recipes-content',
  imports: [LucideAngularModule, SearchBarComponent],
  templateUrl: './recipes-content.component.html',
  styleUrl: './recipes-content.component.css',
})
export class RecipesContentComponent {
  icons = {
    Heart,
    CirclePlus,
    Clock
  };
}
