import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faHome, faPrescriptionBottleMedical, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import { 
  ChartConfiguration, ChartOptions, Chart, ArcElement, BarElement, 
  BarController, DoughnutController, CategoryScale, LinearScale, Legend, Tooltip 
} from 'chart.js';

Chart.register(ArcElement, BarElement, BarController, DoughnutController, CategoryScale, LinearScale, Legend, Tooltip, ChartDataLabels);

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

  public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Genéricos', 'Higiene', 'Bebé', 'Suplementos'],
    datasets: [{ 
      data: [40, 29, 15, 16], 
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'], 
      borderWidth: 0 
    }]
  };

  public donutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Ocultamos la leyenda lateral
    tooltip: { enabled: false }, // Desactivamos los tooltips al pasar el mouse
    datalabels: {
      color: '#fff',
      anchor: 'end',      
      align: 'start',     
      offset: 20,         
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels![ctx.dataIndex];
        return `${label} (${value}%)`; 
      },
      // Esto crea el recuadro que simula la etiqueta conectada
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 4,
      padding: 6,
      font: { size: 11, weight: 'bold' }
    }
  },
  layout: {
    padding: {
      top: 30,
      bottom: 30,
      left: 50,
      right: 50
    }
  }
};

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], backgroundColor: '#3b82f6', borderRadius: 4 }]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { color: '#94a3b8' } }, y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } } }
  };

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => { 
      this.isChartReady = true; 
      this.cdr.detectChanges();
    }, 150);
  }

  onLogout() { this.authService.logout(); this.router.navigate(['/login']); }
}