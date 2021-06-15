import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Page } from '../adoption-module/adoption-list/adoption-list.component';

@Directive({
  selector: '[paginationButton]'
})
export class PageButtonDirective implements OnInit {
  @Input('page') page: Page;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    if (this.page?.current) {
      'text-xs text-blue-500 font-semibold flex w-8 h-8 mx-2 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-200 text-white bg-white'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.next) {
      'text-xs font-semibold flex w-8 h-8 mx-2 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-200 text-white bg-blueGray-200'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.after) {

      'text-xs font-semibold flex w-8 h-8 mx-2 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-200 text-white bg-blueGray-200'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.middle) {
      'text-xs font-semibold flex w-8 h-8 mx-2 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-200 text-white bg-blueGray-200'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    }

  }



}