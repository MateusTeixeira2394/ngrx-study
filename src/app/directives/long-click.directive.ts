import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[longClick]'
})
export class LongClickDirective {

  @Output() longClickEvent: EventEmitter<void> = new EventEmitter<void>();

  private readonly threshold: number = 1000;
  private timeOut: any;

  constructor() { }

  @HostListener('mousedown')
  public clickDown() {

    this.timeOut = setTimeout(() => {
      this.longClickEvent.emit();
      clearTimeout(this.timeOut);
    }, this.threshold);

  };

  @HostListener('mouseup')
  public clickUp() {
    clearTimeout(this.timeOut);
  };

}
