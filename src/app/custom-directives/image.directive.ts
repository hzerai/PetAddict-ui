import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[animalImage]'
})
export class ImageDirective {
  @Input() code1: string = 'C';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onAnswered() {
    switch (this.code1) {
      case 'C':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-image', 'url(\'assets/images/dog.jpg\')');
        break;
      case 'B':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-image', 'url(\'assets/images/cat.jpg\')');
        break;
      case 'A':
        this.renderer.setStyle(this.elRef.nativeElement, 'background-image', 'url(\'assets/images/bird.jpg\')');
        break;
      default:

    }

  }

}