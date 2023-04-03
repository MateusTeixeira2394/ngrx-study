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
    minesAround: 0
  }

  public getClassStyle(): string[] {

    let classes: string[] = [];

    const { known, isMine, minesAround, isFlag } = this.ground;

    classes.push(known ? 'known' : 'unknown');

    if (isMine) classes.push('is-mine');

    if (minesAround === 0 && !isMine) classes.push('safezone');

    if(isFlag) classes.push('is-flag');

    return classes;

  };

  public getClassOfNumbers(): string[] {

    const { minesAround } = this.ground;

    let classes: string[] = ["mineAround"];

    const map: Map<number, string> = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

    const classOfNumbers: string | undefined = map.get(minesAround);

    if (classOfNumbers) classes.push(classOfNumbers);

    return classes;

  }

}
