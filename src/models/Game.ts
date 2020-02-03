import * as ccl from 'chameleon-chess-logic';

import { TPlayers, EPlayerType } from './PlayerType';

// -----------------------------------------------------------------------------

/** Data structure to describe the current situation on the game board, players
 * involved etc. */
export interface IGame {
    players: TPlayers;
    gs: ccl.IGameState;
    selectedPawn: number|null;
}

/** Creates a new game. */
export function createGame(players: TPlayers): IGame|null {
    const gs = ccl.initGame(
        players[ccl.EColor.RED]    !== EPlayerType.NONE,
        players[ccl.EColor.GREEN]  !== EPlayerType.NONE,
        players[ccl.EColor.YELLOW] !== EPlayerType.NONE,
        players[ccl.EColor.BLUE]   !== EPlayerType.NONE,
    );

    return gs === null ? null : {
        players: players,
        gs,
        selectedPawn: null,
    }
}

/** Advances the game depending on the field that was clicked by the user. It
 * returns `null` if a computer player is on turn. In that case use
 * `letComputerAdvanceGame()` to advance the game. */
export function advanceGame(game: IGame, click: ccl.IPosition): IGame|null {
    if (isComputerTurn(game))
        return null;

    const newGS = game.selectedPawn !== null
        ? ccl.makeMove(game.gs, game.selectedPawn, click)
        : null;

    const pawnOnClickedField = ccl.getIndexOfPawnAtPosition(game.gs, click);

    return {
        players: game.players,
        gs: newGS || game.gs,
        selectedPawn: newGS === null ? pawnOnClickedField : null
    };
}

/** This will let the computer do a move.
 * 
 * _Warning:_ This function might take some time to compute. It is recommended
 * to execute it asynchronously (e.g. by using `setTimeout()`). */
export function letComputerAdvanceGame(game: IGame): IGame {
    return {
        players: game.players,
        gs: ccl.letComputerMakeMove(game.gs),
        selectedPawn: null
    };
}

/** Returns true if the player on turn is a computer player. */
export function isComputerTurn(game: IGame): boolean {
    return game.players[game.gs.whoseTurn] === EPlayerType.AI;
}

/** Returns true if a move was made. False if something was just (de)selected. */
export function havePawnsMoved(oldGame: IGame, newGame: IGame): boolean {
    return oldGame.gs.whoseTurn !== newGame.gs.whoseTurn;
}