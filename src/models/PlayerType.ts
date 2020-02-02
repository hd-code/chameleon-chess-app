import { EColor, IGameState } from "chameleon-chess-logic";

// -----------------------------------------------------------------------------

export type TPlayers = {[player in EColor]: EPlayerType}

export enum EPlayerType { NONE, HUMAN, AI }

export function getNextPlayerType(currentPlayerType: EPlayerType): EPlayerType {
    const nextPT = currentPlayerType + 1;
    return nextPT > EPlayerType.AI ? EPlayerType.NONE : nextPT;
}