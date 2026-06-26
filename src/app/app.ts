import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {
  faBox,
  faHome,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { AuthService } from './service/auth.service';
import { LoadingService } from './services/loading';

import { SpinnerComponent } from './components/spinner/spinner';
import { AlertModal } from './components/alert-modal/alert-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    FaIconComponent,
    SpinnerComponent,
    AlertModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('botica');

  iconLogout = faSignOutAlt;
  iconHome = faHome;
  iconProfile = faUserCircle;
  iconBox = faBox;

  // Inicia ocultando el sidebar
  showSidebar = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {

    // Mostrar spinner al iniciar
    this.loadingService.show();

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // Solo mostrar sidebar fuera del login
        this.showSidebar = event.url !== '/login';

        // Ocultar spinner luego de la primera navegación
        setTimeout(() => {
          this.loadingService.hide();
        }, 3000);
      }

    });

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToInventario(): void {
    this.router.navigate(['/inventario']);
  }

}