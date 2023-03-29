import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input()
  public text: string = '';

  @Output()
  public clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(){}

  public click(): void {
    this.clickEvent.emit();
  }

}


