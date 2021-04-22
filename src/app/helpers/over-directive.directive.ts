import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOverDirective]'
})
export class OverDirectiveDirective {
  @Input('appOverDirective') class;
  @HostBinding('class') hover: string;
  
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight("black");
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
