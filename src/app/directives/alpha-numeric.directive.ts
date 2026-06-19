import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphaNumeric]',
  standalone: true
})
export class AlphaNumericDirective {

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    
    // Permitir: 
    // 0-9 (48-57)
    // A-Z (65-90)
    // a-z (97-122)
    const isAlphaNumeric = (
      (charCode >= 48 && charCode <= 57) || 
      (charCode >= 65 && charCode <= 90) || 
      (charCode >= 97 && charCode <= 122)
    );

    if (!isAlphaNumeric) {
      event.preventDefault();
    }
  }
}