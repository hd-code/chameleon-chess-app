import { IGameState, EColor, IPosition, advanceGame } from "chameleon-chess-logic";
import { getIOfPawnAtPosition } from "chameleon-chess-logic/build/pawns";

export enum EPlayerType { NONE, HUMAN, AI }

export interface IGame {
    players: {[player in EColor]: EPlayerType}
    gs: IGameState
    selectedPawn: number|null
}

export function handleClick(click: IPosition, game:IGame): IGame {
    if (game.selectedPawn !== null) {
        const newGS = advanceGame(game.gs, game.selectedPawn, click)

        if (newGS !== null) {
            return {
                players: game.players,
                gs: newGS,
                selectedPawn: null
            }
        }
    }

    const pawnOnClickedField = getIOfPawnAtPosition(click, game.gs.pawns)

    return {
        players: game.players,
        gs: game.gs,
        selectedPawn: pawnOnClickedField
    }
}