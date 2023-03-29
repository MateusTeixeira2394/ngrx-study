import { Component, Input } from '@angular/core';
import Ground from '../../models/ground.model';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.css']
})
export class GroundComponent {

  @Input()
  public ground: Ground = {
    known: false,
    isMine: false,
    mineAround: 0
  }

  public getClassStyle(): string {

    return this.ground.known? 'known' : 'unknown';

  };

}
