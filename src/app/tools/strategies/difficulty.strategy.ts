import Difficulty from '../../models/difficulty.model';

export default function difficultyStrategy(difficulty: string): Difficulty | undefined {

    let map: Map<string, Difficulty> = new Map();

    map.set('easy', { grounds: 68, mines: 20, rowsNCols: 8 });
    map.set('normal', { grounds: 144, mines: 40, rowsNCols: 12 });
    map.set('hard', { grounds: 256, mines: 60, rowsNCols: 16 });

    return map.get(difficulty);

};