import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Adoption } from '../adoption-module/adoption/Adoption';

@Directive({
    selector: '[adoptionBorder]'
})
export class AdoptionBorderDirective implements OnInit {
    @Input('adoption') adoption: Adoption;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {

    }
    ngOnInit(): void {
        if (this.adoption?.status === 'ADOPTED') {
            this.renderer.addClass(this.elRef.nativeElement, 'border-2');
            this.renderer.addClass(this.elRef.nativeElement, 'border-green-700');
        } else if (this.adoption?.urgent) {
            this.renderer.addClass(this.elRef.nativeElement, 'border-2');
            this.renderer.addClass(this.elRef.nativeElement, 'border-red-700');
        }

    }

}