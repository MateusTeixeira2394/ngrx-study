import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { GroundComponent } from '../ground/ground.component';
import Ground from 'src/app/models/ground.model';

describe(BoardComponent.name, () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, GroundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should trigger the discoverEvent when the ${BoardComponent.prototype.discover.name} method is called`, () => {

    let eventTriggered: boolean = false;

    const ground: Ground = {
      isMine: true,
      known: false,
      minesAround: 0
    }

    component.discoverEvent.subscribe(() => eventTriggered = true);

    component.discover(ground);

    expect(eventTriggered).toBe(true);

  });

  const rowAndCols: number = 8;

  it(`should create ${rowAndCols} rows and ${rowAndCols} columns of grounds`, () => {

    let rows: Ground[][] = [];

    for (let i = 0; i < rowAndCols; i++) {
      let cols: Ground[] = [];
      for (let j = 0; j < rowAndCols; j++) {
        cols.push({isMine: true, known: false, minesAround: 0});
      };
      rows.push(cols);
    };
    
    component.rows = rows;

    fixture.detectChanges();

    const boardRows: HTMLElement = fixture.nativeElement.querySelector('.board-row');
    const boardItem: HTMLCollection = boardRows.children

    expect(boardRows.childElementCount).toBe(rowAndCols);
    expect(boardItem.length).toBe(rowAndCols);
    
    

  });

});
