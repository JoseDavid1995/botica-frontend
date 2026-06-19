import { Directive, ElementRef, HostListener, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true
})
export class EmailValidatorDirective {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  @Output() isInvalid = new EventEmitter<boolean>();

  // 1. Debes incluir Renderer2 aquí para que exista
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    const invalid = value !== '' && !this.emailRegex.test(value);
    
    // 2. Ahora this.renderer sí existe
    if (invalid) {
      this.renderer.addClass(this.el.nativeElement.parentElement, 'border-error');
    } else {
      this.renderer.removeClass(this.el.nativeElement.parentElement, 'border-error');
    }
    
    this.isInvalid.emit(invalid);
  }
}