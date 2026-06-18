import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faHome, faPrescriptionBottleMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { 
  ChartConfiguration, ChartOptions, Chart, ArcElement, BarElement, 
  BarController, DoughnutController, CategoryScale, LinearScale, Legend, Tooltip 
} from 'chart.js';

Chart.register(ArcElement, BarElement, BarController, DoughnutController, CategoryScale, LinearScale, Legend, Tooltip);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {
  iconLogout = faSignOutAlt; iconHome = faHome; iconProfile = faUserCircle;
  iconBox = faBox; iconoBotica = faPrescriptionBottleMedical;

  public isChartReady = false;

  // 1. Datos iniciales en cero
  public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Genéricos', 'Higiene', 'Bebé', 'Suplementos'],
    datasets: [{ 
      data: [0, 0, 0, 0], 
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'], 
      borderWidth: 0 
    }]
  };

  ngAfterViewInit() {
    // Retraso para que el contenedor esté listo
    setTimeout(() => { 
      this.isChartReady = true; 
      this.cdr.detectChanges();
      
      // 2. Disparamos la animación cambiando los datos a los valores reales
      setTimeout(() => {
        this.donutChartData = {
          ...this.donutChartData,
          datasets: [{ 
            ...this.donutChartData.datasets[0],
            data: [40, 29, 15, 16] 
          }]
        };
        this.cdr.detectChanges();
      }, 50); 
    }, 150);
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], backgroundColor: '#3b82f6', borderRadius: 4 }]
  };

  public donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2500,
      easing: 'easeOutQuart'
    },
    plugins: { 
      legend: { position: 'right', labels: { color: '#fff', padding: 20 } } 
    }
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { color: '#94a3b8' } }, y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } } }
  };

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  onLogout() { this.authService.logout(); this.router.navigate(['/login']); }
}