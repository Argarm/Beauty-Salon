import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOverDirective]'
})
export class OverDirectiveDirective {
  @Input('appOverDirective') class;
  @HostBinding('class') hover : string;
  constructor() { }

  @HostListener('mouseenter') mouseover(eventData: Event){
    this.hover="active"
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    this.hover="default"
  }
}
