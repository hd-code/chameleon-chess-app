import { EColor } from 'chameleon-chess-logic';

// -----------------------------------------------------------------------------

/** An object specifying a player type for all players (represented by their
 * color) in the game. */
export type TPlayers = {[player in EColor]: EPlayerType}

/** Enum specifying the different kinds of players there are. */
export enum EPlayerType { NONE, HUMAN, AI }

/** Returns the default player types for the four different players. */
export function getDefaultPlayers(): TPlayers {
    return DEFAULT_PLAYERS;
}

/** While configuring the game, the user can 'click through' the different
 * player types. This function gives the next player type in the sequence. */
export function getNextPlayerType(currentPlayerType: EPlayerType): EPlayerType {
    const nextPT = currentPlayerType + 1;
    return nextPT > EPlayerType.AI ? EPlayerType.NONE : nextPT;
}

/** Returns true if there are enough players to start a game (min. 2 players). */
export function isEnoughPlayersForGame(players: TPlayers): boolean {
    let numOfPlayers = 0;
    players[EColor.RED]    !== EPlayerType.NONE && numOfPlayers++;
    players[EColor.GREEN]  !== EPlayerType.NONE && numOfPlayers++;
    players[EColor.YELLOW] !== EPlayerType.NONE && numOfPlayers++;
    players[EColor.BLUE]   !== EPlayerType.NONE && numOfPlayers++;
    return numOfPlayers > 1;
}

// -----------------------------------------------------------------------------

const DEFAULT_PLAYERS: TPlayers = {
    [EColor.RED]: EPlayerType.HUMAN,
    [EColor.GREEN]: EPlayerType.NONE,
    [EColor.YELLOW]: EPlayerType.AI,
    [EColor.BLUE]: EPlayerType.NONE,
}