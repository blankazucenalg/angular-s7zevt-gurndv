import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

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
  private eventSub: Subscription;

  ngOnInit() {
    this.eventSub = fromEvent(window, 'resize')
      .pipe(
        throttleTime(500), // emits once, then ignores subsequent emissions for 300ms, repeat...
        tap((event) => (this.defined = false))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.eventSub.unsubscribe();
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
