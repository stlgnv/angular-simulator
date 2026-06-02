import { Directive, HostBinding, HostListener, Input } from '@angular/core';

export interface GradientConfig {
  delay?: number;
  colors?: string[];
  thickness?: number;
}

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective {

  @Input() gradientConfiguration?: GradientConfig = {
    delay: 1000,
    colors: ['red', 'yellow', 'green'],
    thickness: 2,
  }

  isActive: boolean = false;
  timer?: ReturnType<typeof setTimeout>;

  @HostBinding('style.borderImage')
  get elementBorder(): string {
    if (this.isActive) {
      return `linear-gradient(${ this.gradientConfiguration?.colors?.join(', ') }) ${ this.gradientConfiguration?.thickness }`;
    } else {
      return 'none';
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.timer = setTimeout(() => {
      this.isActive = true;
    }, this.gradientConfiguration?.delay ?? 1000);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.timer);
  }

}
