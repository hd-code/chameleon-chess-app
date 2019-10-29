import { IGameState, EColor } from "chameleon-chess-logic";

enum EPlayerType { NONE, HUMAN, AI }

interface Game {
    players: {[player in EColor]: EPlayerType}
    gs: IGameState
    selectedPawn: number
}