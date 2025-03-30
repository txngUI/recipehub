import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  CookingPot,
  CalendarDays,
  ChefHat,
  ShoppingBasket,
  X,
} from 'lucide-angular';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';
import { ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    BrnPopoverComponent,
    BrnPopoverContentDirective,
    BrnPopoverTriggerDirective,
    RouterLink,
  ],
  template: `
    <brn-popover sideOffset="5">
      <button id="edit-profile" variant="outline" brnPopoverTrigger hlmBtn>
        Open Popover
      </button>
      <div
        hlmPopoverContent
        class="w-80 grid gap-4"
        *brnPopoverContent="let ctx"
      >
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <div class="items-center grid grid-cols-3 gap-4">
            <label hlmLabel for="width">Width</label>
            <input
              hlmInput
              id="width"
              [defaultValue]="'100%'"
              class="h-8 col-span-2"
            />
          </div>
          <div class="items-center grid grid-cols-3 gap-4">
            <label hlmLabel for="maxWidth">Max. width</label>
            <input
              hlmInput
              id="maxWidth"
              [defaultValue]="'300px'"
              class="h-8 col-span-2"
            />
          </div>
          <div class="items-center grid grid-cols-3 gap-4">
            <label hlmLabel for="height">Height</label>
            <input
              hlmInput
              id="height"
              [defaultValue]="'25px'"
              class="h-8 col-span-2"
            />
          </div>
          <div class="items-center grid grid-cols-3 gap-4">
            <label hlmLabel for="maxHeight">Max. height</label>
            <input
              hlmInput
              id="maxHeight"
              [defaultValue]="'none'"
              class="h-8 col-span-2"
            />
          </div>
        </div>
      </div>
    </brn-popover>
  `,
})
export class NavbarComponent implements OnInit {
  username: string | null = '';
  user: any;
  icons = {
    LayoutDashboard,
    CookingPot,
    CalendarDays,
    ChefHat,
    ShoppingBasket,
    X,
  };

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // ✅ On écoute `authState$` pour détecter les changements
    this.authService.authState$.subscribe((authStatus) => {
      this.isLoggedIn = authStatus;
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.username = user ? user.username : null;
    });

    if (this.authService.isAuthenticated()) {
      this.authService.fetchUserData(); // ✅ Charge les infos utilisateur si connecté
    }
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('show');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const popover = document.querySelector('.popover-content');
    if (popover && !this.eRef.nativeElement.contains(event.target)) {
      this.renderer.setStyle(popover, 'display', 'none'); // Cache le popover
    }
  }
}
