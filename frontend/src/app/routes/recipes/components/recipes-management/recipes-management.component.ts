import { Component } from '@angular/core';
import { LucideAngularModule, Folder, FolderOpen, Trash2, PencilLine, File } from 'lucide-angular';

@Component({
  selector: 'app-recipes-management',
  imports: [LucideAngularModule],
  templateUrl: './recipes-management.component.html',
  styleUrl: './recipes-management.component.css',
})
export class RecipesMangamentComponent {
  icons = {
    Folder,
    FolderOpen,
    Trash2,
    PencilLine,
    File
  };
}
