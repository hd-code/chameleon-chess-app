import { IGameState, getBoard, ILimits } from "chameleon-chess-logic";
import { TileProps, TileStatus } from "../components/Tile";
import { PawnProps, PawnStatus } from "../components/Pawn";

export function renderGameState(gs: IGameState):{tiles: TileProps[], pawns: PawnProps[]} {
    const board = getBoard()

    return {
        tiles: board.reduce((result, row, i) => result.concat(row.map((_, j) => ({
            color: board[i][j],
            status: isOutOfLimits(i, j, gs.limits) ? TileStatus.DEACTIVATED : TileStatus.NORMAL
        }))), <TileProps[]>[]),
        
        pawns: gs.pawns.map(pawn => ({
            player: pawn.player,
            roles: pawn.roles,
            position: pawn.position,
            status: PawnStatus.NORMAL,
            currentFieldColor: board[pawn.position.row][pawn.position.col] 
        }))
    }
}

function isOutOfLimits(i:number, j:number, limits: ILimits): boolean {
    return i < limits.lower.row || limits.upper.row < i
        || j < limits.lower.col || limits.upper.col < j
}