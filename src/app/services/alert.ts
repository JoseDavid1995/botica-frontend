import { Injectable, signal } from '@angular/core';

export interface AlertData {
  titulo: string;
  mensaje: string;
  tipo: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  // Usamos una señal para mantener el estado
  alertSignal = signal<AlertData | null>(null);

  show(titulo: string, mensaje: string, tipo: 'success' | 'error') {
    this.alertSignal.set({ titulo, mensaje, tipo });
  }

  close() {
    this.alertSignal.set(null);
  }
}