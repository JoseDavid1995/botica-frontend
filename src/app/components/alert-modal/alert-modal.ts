import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModal {
  iconoCheck = faCheckCircle;
iconoError = faExclamationTriangle;
  constructor(private alertService: AlertService) {}

  // Usamos computed para acceder a la señal del servicio
  alertData = computed(() => this.alertService.alertSignal());

  close() {
    this.alertService.close();
  }
}