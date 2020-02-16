import * as ccl from 'chameleon-chess-logic';

import { TPlayers, EPlayerType } from './Players';

// -----------------------------------------------------------------------------

/** Data structure to describe the current situation on the game board, players
 * involved etc. */
export interface IGame extends ccl.IGame {
    players: TPlayers;
    selectedPawn: number|null;
}

/** Creates a new game and returns the game object. Returns null if a game could
 * not be created because there are not enough players. */
export function createGame(players: TPlayers): IGame|null {
    const game = ccl.initGame(
        players[ccl.EColor.RED]    !== EPlayerType.NONE,
        players[ccl.EColor.GREEN]  !== EPlayerType.NONE,
        players[ccl.EColor.YELLOW] !== EPlayerType.NONE,
        players[ccl.EColor.BLUE]   !== EPlayerType.NONE,
    );

    return game === null ? null : {
        ...game,
        players: players,
        selectedPawn: null,
    }
}

/** Advances the game depending on the field that was clicked by the user. It
 * returns `null` if a computer player is on turn. In that case use
 * `letComputerAdvanceGame()` to advance the game. */
export function advanceGame(game: IGame, click: ccl.IPosition): IGame|null {
    if (isComputerTurn(game))
        return null;

    const newGame = game.selectedPawn !== null
        ? ccl.makeMove(game, game.selectedPawn, click)
        : null;

    const pawnOnClickedField = ccl.getIndexOfPawnAtPosition(game, click);

    return {
        limits:newGame && newGame.limits || game.limits,
        pawns: newGame && newGame.pawns || game.pawns,
        players: game.players,
        selectedPawn: newGame === null ? pawnOnClickedField : null,
        whoseTurn: newGame && newGame.whoseTurn || game.whoseTurn
    };
}

/** This will let the computer do a move and return the updated game object.
 * 
 * _Warning:_ This function might take some time to compute. It is recommended
 * to execute it asynchronously (e.g. by using `setTimeout()`). */
export function letComputerAdvanceGame(game: IGame): IGame {
    return {
        ...ccl.letComputerMakeMove(game),
        players: game.players,
        selectedPawn: null
    };
}

/** Returns true if the player on turn is a computer player. */
export function isComputerTurn(game: IGame): boolean {
    return game.players[game.whoseTurn] === EPlayerType.AI;
}

/** Returns true if a move was made. False if something was just (de)selected. */
export function havePawnsMoved(oldGame: IGame, newGame: IGame): boolean {
    return oldGame.whoseTurn !== newGame.whoseTurn || ccl.isGameOver(newGame);
}

export function getWinner(game: IGame): ccl.EColor|null {
    if (!ccl.isGameOver(game))
        return null;

    const playersAlive = ccl.arePlayersAlive(game);
    return playersAlive[ccl.EColor.RED]    ? ccl.EColor.RED
        :  playersAlive[ccl.EColor.GREEN]  ? ccl.EColor.GREEN
        :  playersAlive[ccl.EColor.YELLOW] ? ccl.EColor.YELLOW
        :  playersAlive[ccl.EColor.BLUE]   ? ccl.EColor.BLUE
        :  null;
}