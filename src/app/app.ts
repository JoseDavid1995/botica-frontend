import { Component, signal, OnInit } from '@angular/core'; // Importa OnInit
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router'; // Importa RouterLink y RouterLinkActive
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { faBox, faHome, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AlertModal } from './components/alert-modal/alert-modal';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone
  imports: [RouterOutlet, MatIconModule, CommonModule, FaIconComponent, RouterLink, RouterLinkActive, AlertModal], // Agrega RouterLink y RouterLinkActive
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  iconLogout = faSignOutAlt; iconHome = faHome; iconProfile = faUserCircle;
    iconBox = faBox;
  protected readonly title = signal('botica');
  showSidebar = true; // <--- ESTA ES LA VARIABLE QUE TE FALTABA

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el sidebar si la URL es '/login' o está vacía
        this.showSidebar = event.url !== '/login' && event.url !== '/';
      }
    });
  }

  onLogout() { 
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

    navigateToInventario() { this.router.navigate(['/inventario']); }

}