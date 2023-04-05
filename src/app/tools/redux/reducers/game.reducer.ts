import { createReducer, on } from '@ngrx/store';
import Game from 'src/app/models/game.model';
import {setGame} from '../actions/game.actions';

export const titleInitialState: Game = {
    difficulty: 'easy',
    grounds: 0,
    mines: 0,
    player: '',
    time: 0
}

export const gameReducer = createReducer<Game>(
    titleInitialState,
    on(setGame, (state, { game }) => ({...game})),
);