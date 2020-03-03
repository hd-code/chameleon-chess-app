import { EColor } from 'chameleon-chess-logic';

// -----------------------------------------------------------------------------

/** The different types of players there are. */
export enum EPlayerType { NONE, HUMAN, COMPUTER }

/** An object mapping the players, represented by one of the four colors, to the
 * corresponding player type. */
export type TPlayers = {[player in EColor]: EPlayerType}

/** TypeGuard for TPlayers */
export function isPlayers(players: any): players is TPlayers {
    return typeof players === 'object' && players !== null
        && players[EColor.RED] !== undefined
        && players[EColor.GREEN] !== undefined
        && players[EColor.YELLOW] !== undefined
        && players[EColor.BLUE] !== undefined
}

/** Standard player configuration. */
export function getDefaultPlayers() {
    return DEFAULT_PLAYERS;
}

/** Returns the next player type. */
export function getNextPlayerType(playerType: EPlayerType) {
    switch (playerType) {
        case EPlayerType.NONE: return EPlayerType.HUMAN;
        case EPlayerType.HUMAN: return EPlayerType.COMPUTER;
        case EPlayerType.COMPUTER: return EPlayerType.NONE;
    }
}

/** Returns true if there are enough players to start a game. */
export function isEnoughPlayers(players: TPlayers) {
    let numOfPlayers = 0;
    if (players[EColor.RED]    !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EColor.GREEN]  !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EColor.YELLOW] !== EPlayerType.NONE) numOfPlayers += 1;
    if (players[EColor.BLUE]   !== EPlayerType.NONE) numOfPlayers += 1;
    return numOfPlayers >= 2;
}

// -----------------------------------------------------------------------------

const DEFAULT_PLAYERS: TPlayers = {
    [EColor.RED]: EPlayerType.HUMAN,
    [EColor.GREEN]: EPlayerType.NONE,
    [EColor.YELLOW]: EPlayerType.COMPUTER,
    [EColor.BLUE]: EPlayerType.NONE,
}