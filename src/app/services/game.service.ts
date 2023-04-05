import Game, { DifficultyType } from '../models/game.model';
export default class GameService {

    private readonly RANKING_GAME_KEY: string = 'ranking-game';

    public saveGame(game: Game): void {

        let games: Game[] = this.getRankedGame();

        if (games.length === 0) {
            localStorage.setItem(this.RANKING_GAME_KEY, JSON.stringify([game]));
        } else {
            localStorage.setItem(this.RANKING_GAME_KEY, JSON.stringify(this.mergeSort(games, [game])));
        }

    };

    public getRankedGame(): Game[] {

        const response: string | null = localStorage.getItem(this.RANKING_GAME_KEY);

        if (response) {
            return JSON.parse(response) as Game[];
        };

        return [];
    };

    public mergeSort(arrA: Game[], arrB: Game[]): Game[] {

        let indexA: number = 0;
        let indexB: number = 0;
        let response: Game[] = [];

        while (
            indexA < arrA.length &&
            indexB < arrB.length
        ) {

            if (this.isBetterThan(arrA[indexA], arrB[indexB])) {
                response.push(arrA[indexA]);
                indexA++;
            } else {
                response.push(arrB[indexB]);
                indexB++;
            };

        };


        if (indexB >= arrB.length) {
            response = [...response, ...arrA.slice(indexA, arrA.length)];
        } else {
            response = [...response, ...arrB.slice(indexB, arrB.length)];
        }

        return response;

    };

    private isBetterThan(gameA: Game, gameB: Game): boolean {

        const map: Map<DifficultyType, number> = new Map([['easy', 0], ['normal', 1], ['hard', 2]]);
        const difficultyA: number = map.get(gameA.difficulty) || 0;
        const difficultB: number = map.get(gameB.difficulty) || 0;

        if(difficultyA > difficultB){
            return true;

        } else if(difficultyA < difficultB){
            return false;

        } else {

            return gameA.time < gameB.time;
        };

    };

};