import Difficulty from './difficulty.model';

export default interface Game extends Difficulty {
    player: string;
    difficulty: DifficultyType
    time: number;
};

export type DifficultyType = 'easy' | 'normal' | 'hard';

export const EASY: string = 'easy';
export const NORMAL: string = 'normal';
export const HARD: string = 'hard';