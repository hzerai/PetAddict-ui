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
      'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.next) {
      'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.after) {

      'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    } else if (this.page?.middle) {
      'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'.split(' ').forEach(c => {
        this.renderer.addClass(this.elRef.nativeElement, c);
      })
    }

  }



}