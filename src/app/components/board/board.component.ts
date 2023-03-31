import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public discover(ground: Ground): void {
    this.discoverEvent.emit(ground);
  };

};
