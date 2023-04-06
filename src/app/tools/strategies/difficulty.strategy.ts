import { EASY, HARD, NORMAL } from 'src/app/models/game.model';
import Difficulty from '../../models/difficulty.model';

export default function difficultyStrategy(difficulty: string): Difficulty | undefined {

    const EASY_MINES: number = 10;
    const EASY_ROWS_N_COLS: number = 8;
    const NORMAL_MINES: number = 20;
    const NORMAL_ROWS_N_COLS: number = 12;
    const HARD_MINES: number = 30;
    const HARD_ROWS_N_COLS: number = 16;

    let map: Map<string, Difficulty> = new Map();

    map.set(EASY, { mines: EASY_MINES, rowsNCols: EASY_ROWS_N_COLS });
    map.set(NORMAL, { mines: NORMAL_MINES, rowsNCols: NORMAL_ROWS_N_COLS });
    map.set(HARD, { mines: HARD_MINES, rowsNCols: HARD_ROWS_N_COLS });

    let difficultyObj: Difficulty | undefined = map.get(difficulty);

    if (!difficultyObj) return undefined;

    const { mines, rowsNCols } = difficultyObj;

    difficultyObj.grounds = Math.pow(rowsNCols, 2) - mines;

    return difficultyObj;


};

