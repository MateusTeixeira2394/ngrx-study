import Difficulty from "src/app/models/difficulty.model";
import difficultyStrategy from "./difficulty.strategy";
import { EASY, HARD, NORMAL } from "src/app/models/game.model";

describe(difficultyStrategy.name, ()=>{

    const EASY_GROUNDS: number = 52;
    const NORMAL_GROUNDS: number = 116;
    const HARD_GROUNDS: number = 206;

    it(`Should return the ${EASY} difficulty with ${EASY_GROUNDS} grounds`, ()=>{

        const difficultyObj: Difficulty | undefined = difficultyStrategy(EASY);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(EASY_GROUNDS);

    });

    it(`Should return the ${NORMAL} difficulty with ${NORMAL_GROUNDS} grounds`, ()=>{

        const difficultyObj: Difficulty | undefined = difficultyStrategy(NORMAL);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(NORMAL_GROUNDS);

    });

    it(`Should return the ${HARD} difficulty with ${HARD_GROUNDS} grounds`, ()=>{

        const difficultyObj: Difficulty | undefined = difficultyStrategy(HARD);

        expect(difficultyObj).not.toBeUndefined();
        expect(difficultyObj?.grounds).toBe(HARD_GROUNDS);

    });

    it(`Should return the undefined when pass unknown difficulty`, ()=>{

        const difficultyObj: Difficulty | undefined = difficultyStrategy('unknown-difficulty');

        expect(difficultyObj).toBeUndefined();

    });

    

    

})