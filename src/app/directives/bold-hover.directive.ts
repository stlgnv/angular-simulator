import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldHover]',
  standalone: true
})
export class BoldHoverDirective {

  @HostBinding('style.fontWeight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.fontWeight = 'normal';
  }

}
