import { flattenArray } from "./helper";
import { IGame } from "./types";

import { getBoard, EColor, getNextMovesOfPawn, IPosition, isFieldWithinLimits, isPlayerAlive } from "chameleon-chess-logic";

import { PawnProps, PawnStatus } from "./components/Pawn";
import { PlayerProps, PlayerStatus } from "./components/Player";
import { TPlayersProps } from "./components/PlayerBoard";
import { TileProps, TileStatus } from "./components/Tile";
import { isGameOver } from "chameleon-chess-logic/build/gameState";

/* --------------------------------- Public --------------------------------- */

export interface IRenderedBoard {
    players: TPlayersProps
    tiles: TileProps[]
    pawns: PawnProps[]
    winner: EColor|null
}

export function renderBoard(game: IGame): IRenderedBoard {
    return {
        players: renderPlayers(game),
        tiles: renderTiles(game),
        pawns: renderPawns(game),
        winner: renderWinner(game)
    }
}

/* --------------------------------- Intern --------------------------------- */

function renderPlayers(game: IGame): TPlayersProps {
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
        status: !isPlayerAlive(player, game.gs) ? PlayerStatus.DEAD
            : game.gs.whoseTurn === player ? PlayerStatus.ON_TURN : PlayerStatus.OFF_TURN
    }
}

const BOARD = getBoard()
function renderTiles(game: IGame): TileProps[] {
    const moves = game.selectedPawn !== null
        ? getNextMovesOfPawn(game.gs, game.selectedPawn)
        : []

    const tiles = BOARD.map((row, i) => {
        return row.map((_, j) => {
            return <TileProps>{
                key: i + '' + j,
                color: BOARD[i][j],
                status: !isFieldWithinLimits({row: i, col: j}, game.gs)
                    ? TileStatus.DEACTIVATED
                    : isInMoves(i, j, moves)
                        ? TileStatus.MARKED
                        : TileStatus.NORMAL
            }
        })
    })

    return flattenArray(tiles)
}

function isInMoves(i: number, j: number, moves: IPosition[]): boolean {
    return moves.filter(move => move.row === i && move.col === j).length > 0
}

function renderPawns(game: IGame): PawnProps[] {
    return game.gs.pawns.map((pawn, i) => {
        return {
            key: pawn.player + '' + pawn.roles[0],
            player: pawn.player,
            roles: pawn.roles,
            position: pawn.position,
            status: i === game.selectedPawn ? PawnStatus.SELECTED : PawnStatus.NORMAL,
            currentFieldColor: BOARD[pawn.position.row][pawn.position.col] 
        }
    })
}

function renderWinner(game: IGame): EColor|null {
    return !isGameOver(game.gs.pawns) ? null
        : isPlayerAlive(EColor.RED, game.gs) ? EColor.RED
        : isPlayerAlive(EColor.GREEN, game.gs) ? EColor.GREEN
        : isPlayerAlive(EColor.YELLOW, game.gs) ? EColor.YELLOW
        : isPlayerAlive(EColor.BLUE, game.gs) ? EColor.BLUE
        : null
}