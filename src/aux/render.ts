import { getBoard, ILimits, IPawn, EColor, getPossibleMoves, IPosition } from "chameleon-chess-logic";
import { flattenArray } from "./helper";
import { IGame } from "./game";
import { TPlayers } from "../components/PlayerBoard";
import { PlayerProps, PlayerStatus } from "../components/Player";
import { TileProps, TileStatus } from "../components/Tile";
import { PawnProps, PawnStatus } from "../components/Pawn";

export interface IRenderedBoard {
    players: TPlayers
    tiles: TileProps[]
    pawns: PawnProps[]
}

export function renderBoard(game: IGame): IRenderedBoard {
    return {
        players: renderPlayers(game),
        tiles: renderTiles(game),
        pawns: renderPawns(game)
    }
}

function renderPlayers(game: IGame): TPlayers {
    return {
        [EColor.RED]:    renderPlayer(game, EColor.RED),
        [EColor.GREEN]:  renderPlayer(game, EColor.GREEN),
        [EColor.YELLOW]: renderPlayer(game, EColor.YELLOW),
        [EColor.BLUE]:   renderPlayer(game, EColor.BLUE),
    }
}

function renderPlayer(game: IGame, player: EColor): PlayerProps {
    return {
        player: player,
        type: game.players[player],
        status: !isPlayerAlive(player, game.gs.pawns) ? PlayerStatus.DEAD
            : game.gs.whoseTurn === player ? PlayerStatus.ON_TURN : PlayerStatus.OFF_TURN
    }
}

function isPlayerAlive(player: EColor, pawns: IPawn[]): boolean {
    return pawns.filter(pawn => pawn.player === player).length > 0
}

const BOARD = getBoard()
function renderTiles(game: IGame): TileProps[] {
    const moves = game.selectedPawn !== null
        ? getPossibleMoves(game.gs, game.selectedPawn)
        : []

    const tiles = BOARD.map((row, i) => {
        return row.map((_, j) => {
            return <TileProps>{
                color: BOARD[i][j],
                status: isOutOfLimits(i, j, game.gs.limits) ? TileStatus.DEACTIVATED
                    : isInMoves(i, j, moves) ? TileStatus.MARKED
                    : TileStatus.NORMAL
            }
        })
    })

    return flattenArray(tiles)
}

function isOutOfLimits(i:number, j:number, limits: ILimits): boolean {
    return i < limits.lower.row || limits.upper.row < i
        || j < limits.lower.col || limits.upper.col < j
}

function isInMoves(i: number, j: number, moves: IPosition[]): boolean {
    return moves.filter(move => move.row === i && move.col === j).length > 0
}

function renderPawns(game: IGame): PawnProps[] {
    return game.gs.pawns.map((pawn, i) => {
        return {
            player: pawn.player,
            roles: pawn.roles,
            position: pawn.position,
            status: i === game.selectedPawn ? PawnStatus.SELECTED : PawnStatus.NORMAL,
            currentFieldColor: BOARD[pawn.position.row][pawn.position.col] 
        }
    })
}