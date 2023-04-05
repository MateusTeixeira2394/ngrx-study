import Difficulty from './difficulty.model';

export default interface Game extends Difficulty {
    player: string;
    difficulty: 'easy' | 'normal' | 'hard';
    time: number;
};

export type DifficultyType = 'easy' | 'normal' | 'hard';