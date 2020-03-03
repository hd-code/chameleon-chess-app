/** @file There is a node package called `chameleon-chess-logic` which provides
 * basic data structures and methods to play a game of chameleon chess. However,
 * In the context of this app additional functionality and information is
 * needed. Therefore, in this file the missing pieces are provided. Some of the
 * functionality from `chameleon-chess-logic` is extended.
 * 
 * See here, if you miss some functionality from `chameleon-chess-logic`. */

import * as ccl from 'chameleon-chess-logic';
import { TPlayers, EPlayerType, isPlayers } from './players';

// -----------------------------------------------------------------------------

/** The `IGame` model from `chameleon-chess-logic` plus additional information
 * about the player types. */
export interface IGameExt extends ccl.IGame {
    players: TPlayers;
}

/** TypeGuard for IGameExt. */
export function isGame(game: any): game is IGameExt {
    return ccl.isGame(game)
        && 'players' in (game as IGameExt) && isPlayers((game as IGameExt).players);
}

/** Extended implementation of createGame from `chameleon-chess-logic`. */
export function createGame(players: TPlayers): IGameExt|null {
    const game = ccl.createGame(
        EPlayerType.NONE !== players[ccl.EColor.RED],
        EPlayerType.NONE !== players[ccl.EColor.GREEN],
        EPlayerType.NONE !== players[ccl.EColor.YELLOW],
        EPlayerType.NONE !== players[ccl.EColor.BLUE]
    );
    return !game ? null : { players, ...game };
}

/** Extended implementation of makeMove from `chameleon-chess-logic`. */
export function makeMove({players, ...game}: IGameExt, pawnI: number, destination: ccl.IPosition): IGameExt|null {
    const newGame = ccl.makeMove(game, pawnI, destination);
    return !newGame ? null : { players, ...newGame };
}

/** Extended implementation of makeComputerMove from `chameleon-chess-logic`. */
export function makeComputerMove({players, ...game}: IGameExt): IGameExt {
    const newGame = ccl.makeComputerMove(game);
    return { players, ...newGame };
}

/** Returns if the player on turn is a computer player. */
export function isComputerMove({players, whoseTurn}: IGameExt): boolean {
    return players[whoseTurn] === EPlayerType.COMPUTER;
}

/** Returns true if a given position is outside the limits. */
export function isOffLimits(row: number, col: number, limits: ccl.ILimits) {
    return row < limits.lower.row || row > limits.upper.row
        || col < limits.lower.col || col > limits.upper.col;
}

/** Returns true if a field is found in the given array of moves. */
export function isInMoves(row: number, col: number, moves: ccl.IPosition[]) {
    const matches = moves.filter(move => row === move.row && col === move.col);
    return matches.length > 0;
}

/** Returns null if the game is not over yet. */
export function getWinner(game: IGameExt): ccl.EColor|null {
    if (!ccl.isGameOver(game)) return null;

    const players = ccl.arePlayersAlive(game);
    for (const player in players) {
        const playerN = parseInt(player);
        if (players[(playerN as ccl.EColor)]) return playerN as ccl.EColor;
    }

    return null;
}