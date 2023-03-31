import Difficulty from '../../models/difficulty.model';

export default function difficultyStrategy(difficulty: string): Difficulty | undefined {

    let map: Map<string, Difficulty> = new Map();

    map.set('easy', { grounds: 52, mines: 12, rowsNCols: 8 });
    map.set('normal', { grounds: 116, mines: 28, rowsNCols: 12 });
    map.set('hard', { grounds: 206, mines: 50, rowsNCols: 16 });

    return map.get(difficulty);

};