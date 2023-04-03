import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Game from 'src/app/models/game.model';
import StatusBar from '../../models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions';
import { setModal, closeModal } from '../../tools/redux/actions/modal.actions'
import Ground from 'src/app/models/ground.model';
import Modal from 'src/app/models/modal.model';
import Button from 'src/app/models/button.model';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})
export class BoardGameComponent implements OnDestroy {

  // Private attributes
  private subscription!: Subscription;
  private grounds: Ground[] = [];
  private interval!: any;

  // Public attributes
  public rows: Ground[][] = [];
  public game: Game = {
    player: '',
    difficulty: '',
    grounds: 0,
    mines: 0,
    time: 0,
    rowsNCols: 0
  };
  public stepButton: Button = {
    text: 'To step',
    icon: '../../assets/icons/step-icon.png'
  };
  public flagButton: Button = {
    text: 'To flag',
    disabled: true,
    icon: '../../assets/icons/flag-icon-green.png'
  }



  constructor(
    private router: Router,
    private store: Store<{ statusbar: StatusBar, game: Game, modal: Modal }>
  ) {

    this.store.dispatch(setTitle({ statusbar: { title: "MINEFIELD'S GAME" } }));

    this.subscription = this.store.select('game').subscribe(game => {

      const { mines, rowsNCols } = game;

      if (mines && rowsNCols) {

        this.grounds = this.getGrounds(rowsNCols, mines);

        this.rows = this.getRows(this.grounds, rowsNCols);

        this.game = { ...game };

        this.setMinesArounds();

        this.startTimer();

      } else {
        // this.router.navigate(['home']);
      };


    });

  }

  // Public methods

  public clickStepButton(): void {

    this.enableStepButton();
    this.disableFlagButton();

  };

  public clickFlagButton(): void {
    this.enableFlagButton();
    this.disableStepButton();
  };

  public click(ground: Ground): void {

    if (this.flagButton.disabled && !ground.isFlag) {
      this.discoverTheGround(ground);
    }

    if (!this.flagButton.disabled) {
      this.flagTheGround(ground);
    };

  };

  // Privates Methods

  private startTimer(): void {

    this.interval = setInterval(()=>{
      this.game.time++
      console.log(this.game.time);
    }, 1000);

  }

  private discoverTheGround(ground: Ground): void {

    ground.known = true;

    if (!ground.isMine) {
      this.decreaseEmptyGrounds();
    } else {
      this.loseGame();
    };

  };

  private flagTheGround(ground: Ground): void {

    if (this.game.mines != undefined){

      if(!ground.isFlag && this.game.mines > 0){
        this.game.mines--;
        ground.isFlag = true;
      }
      
      else if(ground.isFlag){
        this.game.mines++;
        ground.isFlag = false;
      };

    };

  };

  private enableStepButton(): void {
    this.stepButton.disabled = false;
    this.stepButton.icon = '../../assets/icons/step-icon.png'
  }

  private disableStepButton(): void {
    this.stepButton.disabled = true;
    this.stepButton.icon = '../../assets/icons/step-icon-green.png'
  }

  private enableFlagButton(): void {
    this.flagButton.disabled = false;
    this.flagButton.icon = '../../assets/icons/flag-icon.png'
  }

  private disableFlagButton(): void {
    this.flagButton.disabled = true;
    this.flagButton.icon = '../../assets/icons/flag-icon-green.png'
  }

  private decreaseEmptyGrounds(): void {
    this.game.grounds = (this.game.grounds || 0) - 1;
  };

  private loseGame(): void {

    const lostModal: Modal = {
      opened: true,
      hasHeader: true,
      headerTitle: 'Lost Game',
      text: 'So bad! Try another game. Good luck!',
      buttons: [
        {
          text: 'Ok',
          action: () => this.goToHome()
        }
      ],
      actionAfterModalClose: () => this.goToHome()
    }

    this.store.dispatch(setModal({ modal: lostModal }));

    clearInterval(this.interval);

  };

  private goToHome(): void {

    this.store.dispatch(closeModal());
    this.router.navigate(['home']);

  }

  private getMinesPositions(groundsQuantity: number, minesQuantity: number): number[] {

    let minesPositions: number[] = [];
    let index: number = 0;

    while (index < minesQuantity) {

      const randomPosition: number = Math.floor(Math.random() * groundsQuantity);

      if (!minesPositions.find(currVal => currVal === randomPosition)) {
        minesPositions.push(randomPosition);
        index++;
      };

    };

    return minesPositions;

  };

  private getMinesPositionSorted(groundsQuantity: number, minesQuantity: number): number[] {
    return this.getMinesPositions(groundsQuantity, minesQuantity).sort((a, b) => a - b);
  }

  private getGrounds(rowNcols: number, minesQuantity: number): Ground[] {

    const groundsQuantity: number = Math.pow(rowNcols, 2);

    let minesPositions: number[] = this.getMinesPositionSorted(groundsQuantity, minesQuantity);

    let grounds: Ground[] = [];

    for (let i = 0; i < groundsQuantity; i++) {

      const isMine: boolean = i === minesPositions[0];

      if (isMine) minesPositions.shift();

      grounds.push({ isMine, known: false, minesAround: 0 });

    };

    return grounds;
  }

  private getRows(grounds: Ground[], rowsNCols: number): Ground[][] {

    let rows: Ground[][] = [];

    for (let i = 0; i < grounds.length; i += rowsNCols) {
      rows.push(grounds.slice(i, i + rowsNCols));
    }

    return rows;

  }

  private setMinesArounds(): void {

    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].length; j++) {

        const ground = this.rows[i][j];

        if (!ground.isMine) {

          const neighbors: Array<Ground | undefined> = this.getNeighbors(i, j);

          ground.minesAround = this.getMinesAround(neighbors);

        };

      };
    };

  };

  private getNeighbors(i: number, j: number): Array<Ground | undefined> {

    const northGround: Ground | undefined = this.rows[i - 1] ? this.rows[i - 1][j] : undefined;
    const northEastGround: Ground | undefined = this.rows[i - 1] ? this.rows[i - 1][j + 1] : undefined;
    const eastGround: Ground | undefined = this.rows[i] ? this.rows[i][j + 1] : undefined;
    const southEastGround: Ground | undefined = this.rows[i + 1] ? this.rows[i + 1][j + 1] : undefined;
    const southGround: Ground | undefined = this.rows[i + 1] ? this.rows[i + 1][j] : undefined;
    const southWestGround: Ground | undefined = this.rows[i + 1] ? this.rows[i + 1][j - 1] : undefined;
    const westGround: Ground | undefined = this.rows[i] ? this.rows[i][j - 1] : undefined;
    const northWestGround: Ground | undefined = this.rows[i - 1] ? this.rows[i - 1][j - 1] : undefined;

    return [northGround, northEastGround, eastGround,
      southEastGround, southGround, southWestGround, westGround, northWestGround];

  };

  private getMinesAround(neighbors: Array<Ground | undefined>): number {

    let minesAround: number = 0;

    neighbors.forEach(neighbor => {

      if (neighbor?.isMine) minesAround++;

    });

    return minesAround;

  };

  // Component life cycles

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

};
