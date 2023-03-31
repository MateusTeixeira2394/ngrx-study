import Difficulty from '../../models/difficulty.model';

export default function difficultyStrategy(difficulty: string): Difficulty | undefined {

    let map: Map<string, Difficulty> = new Map();

    map.set('easy', { grounds: 44, mines: 20, rowsNCols: 8 });
    map.set('normal', { grounds: 104, mines: 40, rowsNCols: 12 });
    map.set('hard', { grounds: 196, mines: 60, rowsNCols: 16 });

    return map.get(difficulty);

};