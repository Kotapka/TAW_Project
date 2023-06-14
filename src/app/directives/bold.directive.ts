import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor(private el: ElementRef) { }

  @HostListener("mouseenter")
  MouseEnter(){
    this.el.nativeElement.style.fontWeight = "bold";
  }

  @HostListener("mouseleave")
  MouseLeave(){
    this.el.nativeElement.style.fontWeight = "normal";
  }
}
