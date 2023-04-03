import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  constructor() { }

  public click(): void {
    this.clickEvent.emit();
  }

  public getClasses(): string[] {

    let classes = ['button'];

    if (this.button.disabled) {
      classes.push('disabled');
    };

    return classes;

  };

}


