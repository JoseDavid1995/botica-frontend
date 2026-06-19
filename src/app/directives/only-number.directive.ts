import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
  standalone: true
})
export class OnlyNumberDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = event;
    // Permitir: Backspace, Tab, End, Home, flechas, Supr
    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Asegurar que es un número y parar el evento si no lo es
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}