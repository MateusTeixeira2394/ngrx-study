import { createAction, props } from '@ngrx/store';
import Game from 'src/app/models/game.model';

interface State {
    game: Game;
};

export const setGame = createAction('[Game] setGame', props<State>());