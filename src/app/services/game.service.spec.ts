import Game from '../models/game.model';
import GameService from './game.service';

describe(GameService.name, () => {

    let gameService: GameService;

    const games: Game[] = [
        {
            player: 'A',
            difficulty: 'normal',
            time: 1,
            mines: 0,
            rowsNCols: 0
        },
        {
            player: 'B',
            difficulty: 'easy',
            time: 2,
            mines: 0,
            rowsNCols: 0
        }
    ];

    beforeEach(() => {

        gameService = new GameService();

    });

    describe('#' + GameService.prototype.mergeSort.name, () => {


        const arrA: Game[] = [
            {
                player: 'A',
                difficulty: 'easy',
                time: 1,
                mines: 0,
                rowsNCols: 0
            },
            {
                player: 'B',
                difficulty: 'easy',
                time: 5,
                mines: 0,
                rowsNCols: 0
            },
            {
                player: 'C',
                difficulty: 'easy',
                time: 7,
                mines: 0,
                rowsNCols: 0
            }
        ];

        it('should insert the game with player D into the second position when the method is called.', () => {

            const arrB: Game[] = [
                {
                    player: 'D',
                    difficulty: 'easy',
                    time: 2,
                    mines: 0,
                    rowsNCols: 0
                }
            ];

            const mergedList: Game[] = gameService.mergeSort(arrA, arrB);

            expect(mergedList[1].player)
                .withContext('merged list: ' + JSON.stringify(mergedList))
                .toBe('D');

        });

        it('should insert the game with player D in the last position when the method is called.', () => {

            const arrB: Game[] = [
                {
                    player: 'D',
                    difficulty: 'easy',
                    time: 9,
                    mines: 0,
                    rowsNCols: 0
                }
            ];

            const mergedList: Game[] = gameService.mergeSort(arrA, arrB);

            expect(mergedList[mergedList.length - 1].player)
                .withContext('merged list: ' + JSON.stringify(mergedList))
                .toBe('D');

        });

        it('should insert the game with player D in the first position when its difficulty will be bigger.', () => {

            const arrB: Game[] = [
                {
                    player: 'D',
                    difficulty: 'normal',
                    time: 9,
                    mines: 0,
                    rowsNCols: 0
                }
            ];

            const mergedList: Game[] = gameService.mergeSort(arrA, arrB);

            expect(mergedList[0].player)
                .withContext('merged list: ' + JSON.stringify(mergedList))
                .toBe('D');

        });

        it('should insert the game with player D in the first position and E in second because its difficulties', () => {

            const arrB: Game[] = [
                {
                    player: 'D',
                    difficulty: 'hard',
                    time: 12,
                    mines: 0,
                    rowsNCols: 0
                }, {
                    player: 'E',
                    difficulty: 'normal',
                    time: 10,
                    mines: 0,
                    rowsNCols: 0
                }
            ];

            const mergedList: Game[] = gameService.mergeSort(arrA, arrB);

            expect(mergedList[0].player)
                .withContext('merged list: ' + JSON.stringify(mergedList))
                .toBe('D');

            expect(mergedList[1].player)
                .withContext('merged list: ' + JSON.stringify(mergedList))
                .toBe('E');

        });

    });

    describe('#' + GameService.prototype.getRankedGame.name, () => {

        it('should return a list of games', () => {

            spyOn(localStorage, "getItem").and.callFake((key: string): string => {
                return JSON.stringify(games);
            });

            expect(gameService.getRankedGame()).toEqual(games);

        });

        it('should return a empty list of games', () => {

            spyOn(localStorage, "getItem").and.callFake((key: string): string => {
                return "[]";
            });

            expect(gameService.getRankedGame()).toEqual([]);

        });


    });

    describe('#' + GameService.prototype.saveGame.name, () => {

        const game: Game = {
            player: 'A',
            difficulty: 'easy',
            time: 1,
            mines: 0,
            rowsNCols: 0
        }

        it('Should call the setItem method of localstorage', () => {

            spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
                return JSON.stringify(games);
            });

            const spy = spyOn(localStorage, 'setItem');

            gameService.saveGame(game);

            expect(spy).toHaveBeenCalled();

        });

        it('Should call the setItem method of localstorage even without any games stored.', () => {

            spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
                return JSON.stringify(games);
            });

            const spy = spyOn(localStorage, 'setItem');

            gameService.saveGame(game);

            expect(spy).toHaveBeenCalled();

        });

    });

});