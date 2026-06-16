import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faHome, faPrescriptionBottleMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Iconos
  iconLogout = faSignOutAlt;
  iconHome = faHome;
  iconProfile = faUserCircle;  
  iconBox = faBox;
  iconoBotica = faPrescriptionBottleMedical;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}