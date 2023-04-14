import Difficulty from "src/app/models/difficulty.model";
import difficultyStrategy, { EASY_MINES, EASY_ROWS_N_COLS, HARD_MINES, HARD_ROWS_N_COLS, NORMAL_MINES, NORMAL_ROWS_N_COLS } from "./difficulty.strategy";
import { EASY, HARD, NORMAL } from "src/app/models/game.model";

describe(difficultyStrategy.name, () => {

    const EASY_GROUNDS: number = EASY_ROWS_N_COLS * EASY_ROWS_N_COLS - EASY_MINES;
    const NORMAL_GROUNDS: number = NORMAL_ROWS_N_COLS * NORMAL_ROWS_N_COLS - NORMAL_MINES;
    const HARD_GROUNDS: number = HARD_ROWS_N_COLS * HARD_ROWS_N_COLS - HARD_MINES;

    it(`Should return the ${EASY} difficulty with ${EASY_GROUNDS} grounds`, () => {

        const difficultyObj: Difficulty | undefined = difficultyStrategy(EASY);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(EASY_GROUNDS);

    });

    it(`Should return the ${NORMAL} difficulty with ${NORMAL_GROUNDS} grounds`, () => {

        const difficultyObj: Difficulty | undefined = difficultyStrategy(NORMAL);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(NORMAL_GROUNDS);

    });

    it(`Should return the ${HARD} difficulty with ${HARD_GROUNDS} grounds`, () => {

        const difficultyObj: Difficulty | undefined = difficultyStrategy(HARD);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(HARD_GROUNDS);

    });

    it(`Should return the undefined when pass unknown difficulty`, () => {

        const difficultyObj: Difficulty | undefined = difficultyStrategy('unknown-difficulty');

        expect(difficultyObj).toBeUndefined();

    });





})