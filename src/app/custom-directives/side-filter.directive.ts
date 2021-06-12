import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sideFilter]'
})
export class SideFilterDirective {
  @Input() open: boolean;
  @Input() main: boolean ;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onAnswered() {
    if (this.open) {
      if (this.main) {
        this.renderer.addClass(this.elRef.nativeElement, 'w-3/5');
      } else {
        this.renderer.addClass(this.elRef.nativeElement, 'translate-x-0 ease-out');
      }
    } else {
      if (this.main) {
        this.renderer.addClass(this.elRef.nativeElement, 'w-4/5');
      } else {
        this.renderer.addClass(this.elRef.nativeElement, 'translate-x-full ease-in');

      }
    }


  }

}