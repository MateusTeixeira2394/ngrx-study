import Difficulty from './difficulty.model';

export default interface Game extends Difficulty {
    player: string;
    difficulty: string;
    time: number;
};