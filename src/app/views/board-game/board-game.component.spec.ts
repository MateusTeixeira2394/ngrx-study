import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameComponent } from './board-game.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Store, StoreModule } from '@ngrx/store';
import { statusBarReducer } from 'src/app/tools/redux/reducers/status-bar.reducer';
import { modalReducer } from 'src/app/tools/redux/reducers/modal.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import GameService from 'src/app/services/game.service';
import { BoardComponent } from 'src/app/components/board/board.component';
import { EASY_MINES, EASY_ROWS_N_COLS } from 'src/app/tools/strategies/difficulty.strategy';
import { Router } from '@angular/router';
import { setGame } from '../../tools/redux/actions/game.actions'
import Ground from 'src/app/models/ground.model';
import Modal from 'src/app/models/modal.model';
import { FLAG_BUTTON_DISABLED_ICON, FLAG_BUTTON_ENABLED_ICON, LOST_MODAL_HEADER_TITLE, STEP_BUTTON_DISABLED_ICON, STEP_BUTTON_ENABLED_ICON, WON_MODAL_HEADER_TITLE } from './board-game.constants';
import Game from 'src/app/models/game.model';
import { gameReducer } from 'src/app/tools/redux/reducers/game.reducer';
import { GroundComponent } from 'src/app/components/ground/ground.component';

describe(BoardGameComponent.name, () => {

  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;
  let store: Store<{ modal: Modal }>;
  let gameServiceMock: jasmine.SpyObj<GameService>;
  let router: Router;

  const playerName: string = "Player's name"
  const game: Game = {
    player: playerName,
    difficulty: 'easy',
    mines: EASY_MINES,
    rowsNCols: EASY_ROWS_N_COLS,
    time: 0,
    grounds: EASY_ROWS_N_COLS * EASY_ROWS_N_COLS - EASY_MINES
  }

  beforeEach(async () => {

    gameServiceMock = jasmine.createSpyObj(['saveGame']);

    await TestBed.configureTestingModule({
      declarations: [
        BoardGameComponent,
        ButtonComponent,
        BoardComponent,
        GroundComponent
      ],
      imports: [
        StoreModule.forRoot({
          statusbar: statusBarReducer,
          modal: modalReducer,
          game: gameReducer
        }),
        RouterTestingModule
      ],
      providers: [
        { provide: GameService, useValue: gameServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardGameComponent);
    router = TestBed.get(Router);
    store = TestBed.get(Store<{ modal: Modal }>);

    spyOn(router, "navigate");

    store.dispatch(setGame({ game }));

    component = fixture.componentInstance

    component.game = game;

    fixture.detectChanges();

  });


  describe('UI tests', () => {

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it("the name component should be equals the player's game", () => {

      const infoItems: NodeList = fixture.nativeElement.querySelectorAll('.info-item > p');

      const playerNameEl: HTMLElement = infoItems[1] as HTMLElement;

      expect(playerNameEl.textContent).toEqual(component.game.player);

    });

    it("the difficulty component should be equals the difficulty's game", () => {

      const infoItems: NodeList = fixture.nativeElement.querySelectorAll('.info-item > p');

      const difficultyEl: HTMLElement = infoItems[3] as HTMLElement;

      expect(difficultyEl.textContent).toEqual(component.game.difficulty);

    });

    it("the grounds component should be equals the grounds' game", () => {

      const infoItems: NodeList = fixture.nativeElement.querySelectorAll('.info-item > p');

      const groundsEl: HTMLElement = infoItems[5] as HTMLElement;

      const grounds: number = component.game.grounds || 0;

      expect(groundsEl.textContent).toEqual(grounds.toString());

    });

    it("the mines component should be equals the mines' game", () => {

      const infoItems: NodeList = fixture.nativeElement.querySelectorAll('.info-item > p');

      const groundsEl: HTMLElement = infoItems[7] as HTMLElement;

      const mines: number = component.game.mines || 0;

      expect(groundsEl.textContent).toEqual(mines.toString());

    });

    it("the time component should be equals the time' game", () => {

      const infoItems: NodeList = fixture.nativeElement.querySelectorAll('.info-item > p');

      const timeEl: HTMLElement = infoItems[9] as HTMLElement;

      expect(timeEl.textContent).toEqual("0:00:00");

    });

  });

  describe(BoardGameComponent.prototype.click.name, () => {

    it("should discover the ground when it is clicked with flag disabled and it isn't a flag", () => {

      let ground: Ground = {
        isMine: false,
        known: false,
        minesAround: 1,
        isFlag: false
      }

      const groundsQt: number = (component.game.grounds || 0) - 1;

      component.flagButton.disabled = true;

      component.click(ground);

      fixture.detectChanges();

      expect(ground.known).toBeTrue();
      expect(component.game.grounds).toEqual(groundsQt);


    });

    it("should lose the game and the lost modal should be shown when the ground with mine is clicked", done => {

      let ground: Ground = {
        isMine: true,
        known: false,
        minesAround: 0,
        isFlag: false
      }

      component.flagButton.disabled = true;

      component.click(ground);

      fixture.detectChanges();

      expect(ground.known).toBeTrue();

      store.select('modal').subscribe(modal => {

        expect(modal.headerTitle).toEqual(LOST_MODAL_HEADER_TITLE);
        expect(modal.opened).toBeTrue();

        done();

      });

    });

    it("should win the game when the last empty ground is clicked", done => {

      let ground: Ground = {
        isMine: false,
        known: false,
        minesAround: 1,
        isFlag: false
      };

      component.flagButton.disabled = true;

      component.game.grounds = 1;

      fixture.detectChanges();

      component.click(ground);

      expect(component.game.grounds).toEqual(0);
      expect(ground.known).toBeTrue();

      store.select('modal').subscribe(modal => {

        expect(modal.headerTitle).toEqual(WON_MODAL_HEADER_TITLE);
        expect(modal.opened).toBeTrue();

        done();

      });

    });

    it("should flag the ground when it is clicked, the flag is activated and it hasn't already been flagged", () => {

      let ground: Ground = {
        isMine: false,
        known: false,
        minesAround: 1,
        isFlag: false
      };

      component.flagButton.disabled = false;

      const minesQt: number = component.game.mines - 1;

      fixture.detectChanges();

      component.click(ground);

      expect(ground.isFlag).toBeTrue();
      expect(component.game.mines).toEqual(minesQt);

    });

    it("should unflag the ground when it is clicked, the flag is activated and it has already been flagged", () => {

      let ground: Ground = {
        isMine: false,
        known: false,
        minesAround: 1,
        isFlag: true
      };

      component.flagButton.disabled = false;

      const minesQt: number = component.game.mines + 1;

      fixture.detectChanges();

      component.click(ground);

      expect(ground.isFlag).toBeFalse();
      expect(component.game.mines).toEqual(minesQt);

    });

  });

  describe(BoardGameComponent.prototype.clickFlagButton.name, () => {

    it('should enable the flag button and disable the step button', () => {

      component.clickFlagButton();

      expect(component.flagButton.disabled).toBeFalse();
      expect(component.flagButton.icon).toBe(FLAG_BUTTON_ENABLED_ICON);

      expect(component.stepButton.disabled).toBeTrue();
      expect(component.stepButton.icon).toBe(STEP_BUTTON_DISABLED_ICON);

    });

  });

  describe(BoardGameComponent.prototype.clickStepButton.name, ()=>{

    it('should disable the flag button and enable the step button', () => {

      component.clickStepButton();

      expect(component.flagButton.disabled).toBeTrue();
      expect(component.flagButton.icon).toBe(FLAG_BUTTON_DISABLED_ICON);

      expect(component.stepButton.disabled).toBeFalse();
      expect(component.stepButton.icon).toBe(STEP_BUTTON_ENABLED_ICON);

    });

  });

});
