import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matTooltipIfTruncated]',
})
export class MatTooltipIfTruncatedDirective
  implements AfterViewInit, AfterViewChecked
{
  constructor(
    private readonly matTooltip: MatTooltip,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  defined = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.defined = false;
  }

  ngAfterViewInit(): void {
    if (!this.defined) this.checkElement();
  }

  ngAfterViewChecked(): void {
    if (!this.defined) this.checkElement();
  }

  checkElement() {
    const element = this.elementRef.nativeElement;
    // Disable tooltip if text doesn't overflow
    if (element.scrollWidth > 0 && element.clientWidth > 0) {
      console.log(element.scrollWidth, element.clientWidth);
      this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
      console.log(element, this.matTooltip.disabled ? 'disabled' : 'enabled');
      this.defined = true;
    }
  }
}
