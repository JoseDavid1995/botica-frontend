import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  NavigationStart,
  NavigationCancel,
  NavigationError
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

  /* ngOnInit(): void {

    this.loadingService.show();

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.showSidebar = event.url !== '/login';

        setTimeout(() => {
          this.loadingService.hide();
        }, 3000);
      }

    });

  } */

    // En tu ngOnInit, mantén la lógica de navegación que corregimos:
ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      this.loadingService.show();
    }
    
    if (event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError) {
      
      const url = (event as any).urlAfterRedirects || (event as any).url;
      this.showSidebar = url !== '/login';
      
      // Llamamos a hide() inmediatamente; el servicio se encargará 
      // del retraso de 500ms gracias al switchMap
      this.loadingService.hide();
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