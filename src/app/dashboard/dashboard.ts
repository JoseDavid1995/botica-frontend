import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faHome, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { 
  ChartConfiguration, ChartOptions, Plugin, ArcElement, BarElement, 
  BarController, DoughnutController, CategoryScale, LinearScale, Legend, Tooltip, Chart
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
  iconBox = faBox;
  public isChartReady = false;
  public barChartData: any;

  ngOnInit() {
  const weekData = this.getWeekData();
  this.barChartData = {
    labels: weekData.dates,
    datasets: [{
      data: weekData.data,
      backgroundColor: ['#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#f43f5e'],
      borderRadius: 4
    }]
  };
}

  public connectorPlugin: Plugin = {
    id: 'connectorLines',
    afterDraw: (chart: any) => {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      
      meta.data.forEach((element: any) => {
        const label = element.$datalabels ? element.$datalabels[0] : null;
        if (label) {
          const { x, y } = element.getCenterPoint();
          const angle = (element.startAngle + element.endAngle) / 2;
          const radius = element.outerRadius;
          
          ctx.save();
          ctx.strokeStyle = '#ffffff'; 
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
          ctx.lineTo(label.x, label.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    }
  };

  public chartPlugins = [ChartDataLabels, this.connectorPlugin];

  public donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 40 },
    plugins: { 
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'end',
        offset: 5,
        formatter: (value, ctx) => `${ctx.chart.data.labels![ctx.dataIndex]} (${value}%)`,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
        font: { size: 10, weight: 'bold' }
      }
    }
  };

  public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Genéricos', 'Higiene', 'Bebé', 'Suplementos'],
    datasets: [{ 
      data: [40, 29, 15, 16], 
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'], 
      borderWidth: 0 
    }]
  };

public barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        title: (context: any) => {
          return `Fecha: ${context[0].label}`;
        },
        label: (context: any) => {
          let label = 'Monto Soles: ';
          if (context.parsed.y !== null) {
            label += `S/ ${context.parsed.y}`;
          }
          return label;
        }
      }
    },
    datalabels: { display: false }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
  }
};
  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit() { 
    setTimeout(() => { 
      this.isChartReady = true; 
      this.cdr.detectChanges(); 
    }, 500); 
  }
  
  onLogout() { this.authService.logout(); this.router.navigate(['/login']); }

  navigateToInventario() { this.router.navigate(['/inventario']); }

public getWeekData() {
  const dates: string[] = [];
  const data: number[] = [];
  const today = new Date();

  const dayOfWeek = today.getDay() || 7;
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() - (dayOfWeek - 1));

  for (let i = 0; i < 7; i++) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);
    
    dates.push(current.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }));
    
    data.push(Math.floor(Math.random() * 100) + 10); 
  }

  return { dates, data };
}
}