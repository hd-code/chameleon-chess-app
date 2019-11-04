import { isString, isNumber } from "./helper";
import { EColor, IGameState } from "chameleon-chess-logic";

/* ------------------------------ EPlayerType ------------------------------- */

export enum EPlayerType { NONE, HUMAN, AI }

export type TPlayers = {[player in EColor]: EPlayerType}

export function getNextPlayerType(currentPlayerType: EPlayerType): EPlayerType {
    const nextPT = currentPlayerType + 1
    return nextPT > EPlayerType.AI ? EPlayerType.NONE : nextPT
}

/* --------------------------------- IGame ---------------------------------- */

export interface IGame {
    players: TPlayers
    gs: IGameState
    selectedPawn: number|null
}

/* ------------------------------- ELanguage -------------------------------- */

export enum ELanguage {
    GERMAN  = 'de',
    ENGLISH = 'en'
}

export function isELanguage(x: any): x is ELanguage {
    return isString(x) && x in ELanguage
}

/* ------------------------------ EColorScheme ------------------------------ */

export enum EColorScheme { NORMAL, ACCESSIBLE }

export function isColorScheme(x:any): x is EColorScheme {
    return isNumber(x) && EColorScheme[x] !== undefined
}