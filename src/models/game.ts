/** @file There is a node package called `chameleon-chess-logic` which provides
 * basic data structures and methods to play a game of chameleon chess. However,
 * In the context of this app additional functionality and information is
 * needed. Therefore, in this file the data structures from `chameleon-chess-logic`
 * will be extended to cater this app's needs. Also, some of the functions from
 * `chameleon-chess-logic` needed to be extended as well to handle the extended
 * data structures.
 * 
 * It is highly recommended to use the implementation from this model whenever
 * possible, instead of the versions from `chameleon-chess-logic`. */

import * as ccl from 'chameleon-chess-logic';

import { TPlayers, EPlayerType, isPlayers } from './players';

// -----------------------------------------------------------------------------

/** The `IGame` model from `chameleon-chess-logic` plus additional information
 * about the player types. */
export interface IGame extends ccl.IGame {
    players: TPlayers;
}

export function isGame(game: any): game is IGame {
    return ccl.isGame(game)
        && 'players' in (game as IGame) && isPlayers((game as IGame).players);
}

export function createGame(players: TPlayers): IGame|null {
    const game = ccl.createGame(
        EPlayerType.NONE !== players[ccl.EColor.RED],
        EPlayerType.NONE !== players[ccl.EColor.GREEN],
        EPlayerType.NONE !== players[ccl.EColor.YELLOW],
        EPlayerType.NONE !== players[ccl.EColor.BLUE]
    );
    return game === null ? null : { players, ...game };
}

export function makeMove(game: IGame, pawnI: number, destination: ccl.IPosition): IGame|null {
    const newGame = ccl.makeMove(game, pawnI, destination);
    return !newGame ? null : { players: game.players, ...newGame };
}

export function makeComputerMove(game: IGame): IGame {
    const newGame = ccl.makeComputerMove(game);
    return { players: game.players, ...newGame };
}

export function isComputerMove(game: IGame): boolean {
    return game.players[game.whoseTurn] === EPlayerType.COMPUTER;
}

export function isGameOver(game: IGame): boolean {
    return ccl.isGameOver(game);
}

export function getWinner(game: IGame): ccl.EColor|null {
    if (!isGameOver(game)) return null;

    const players = ccl.arePlayersAlive(game);
    for (const player in players) {
        const playerN = parseInt(player);
        if (players[(playerN as ccl.EColor)]) return playerN as ccl.EColor;
    }

    return null;
}