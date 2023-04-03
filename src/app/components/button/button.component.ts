import { Component, EventEmitter, Input, Output } from '@angular/core';
import Button from 'src/app/models/button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input()
  public button: Button = {
    text: ''
  };

  @Output()
  public clickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(){}

  public click(): void {
    this.clickEvent.emit();
  }

}


