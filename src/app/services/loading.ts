import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  
  // Usamos un pequeño truco: si alguien pide hide, 
  // esperamos 500ms (o lo que desees) antes de emitir el false
  public isLoading$ = this._isLoading.pipe(
    switchMap(loading => {
      if (!loading) return timer(1000).pipe(map(() => false)); // Espera 500ms antes de ocultar
      return [true]; // Si es true, muéstralo de inmediato
    })
  );

  show() { this._isLoading.next(true); }
  hide() { this._isLoading.next(false); }
}