import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlagEvent } from 'src/app/models/flagEvent.model';
import Ground from 'src/app/models/ground.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  @Input()
  public rows: Ground[][] = [];

  @Output()
  public discoverEvent: EventEmitter<Ground> = new EventEmitter();

  @Output()
  public flagEvent: EventEmitter<FlagEvent> = new EventEmitter();

  public discover(ground: Ground): void {
    this.discoverEvent.emit(ground);
  };

  public flag(flagEvent: FlagEvent): void {
    this.flagEvent.emit(flagEvent);
  }

};
