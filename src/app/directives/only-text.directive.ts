import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyText]',
  standalone: true
})
export class OnlyTextDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = event;
    const charCode = e.keyCode;
    
    // Permitir: Backspace, Tab, Espacio, flechas, etc.
    if ([8, 9, 32, 46, 37, 39].indexOf(charCode) !== -1) {
      return;
    }
    
    // Solo permitir letras (A-Z)
    if ((charCode >= 65 && charCode <= 90)) {
      return;
    }
    
    e.preventDefault();
  }
}