import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FlagEvent } from '../models/flagEvent.model';

@Directive({
  selector: '[longClick]'
})
export class LongClickDirective {

  @Output() longClickEvent: any = new EventEmitter<any | null>();

  private threshold: number = 1000;
  private timeOut: any;

  constructor() { }

  @HostListener('mousedown')
  public clickDown() {

    this.timeOut = setTimeout(() => {
      this.longClickEvent.emit(true);
      console.log('Disparou timeout');
    }, this.threshold);

    console.log('Botão apertado');
  };

  @HostListener('mouseup')
  public clickUp() {
    clearTimeout(this.timeOut);
    console.log("Botão soltado")
  };

}
