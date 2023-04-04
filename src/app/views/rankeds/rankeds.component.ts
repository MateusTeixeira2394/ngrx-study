import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import StatusBar from 'src/app/models/status-bar.model';
import {setTitle} from '../../tools/redux/actions/status-bar.actions'
import Game from 'src/app/models/game.model';
import GameService from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rankeds',
  templateUrl: './rankeds.component.html',
  styleUrls: ['./rankeds.component.css']
})
export class RankedsComponent {

  public games: Game[] = [];

  constructor(
    private store: Store<{statusbar: StatusBar}>,
    private gameService: GameService,
    private router: Router
  ){

    store.dispatch(setTitle({statusbar: {title: 'Rankeds'}}));

    this.games = gameService.getRankedGame();

  };

  public goToHome(): void {
    this.router.navigate(['home']);
  }

}
