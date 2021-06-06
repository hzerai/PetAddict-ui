import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  @Input() code: string = '';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onAnswered() {
    switch (this.code) {
      case 'A':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green');
        break;
      case 'B':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
        break;
      case 'C':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
        break;
      default:

    }

  }

}