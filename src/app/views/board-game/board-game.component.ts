import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Game from 'src/app/models/game.model';
import StatusBar from '../../models/status-bar.model';
import { setTitle } from '../../tools/redux/actions/status-bar.actions';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})
export class BoardGameComponent implements OnDestroy {

  private subscription!: Subscription;

  public game: Game = {
    player: 'Mateus',
    difficulty: 'easy',
    grounds: 80,
    mines: 20,
    time: 0
  }

  constructor(
    private router: Router,
    private store: Store<{ statusbar: StatusBar, game: Game }>
  ) {

    this.store.dispatch(setTitle({ statusbar: { title: "MINEFIELD'S GAME" } }));

    this.subscription = this.store.select('game').subscribe(game => {
      
      // this.game = game;

      // if (!game?.player) {
      //   this.router.navigate(['home']);
      // };

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
