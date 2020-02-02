import { flattenArray } from "../../lib/hd-helper";
import { TPlayers } from "./PlayerType";

import * as ccl from 'chameleon-chess-logic';

import { FieldProps, FieldStatus } from '../components/game/Field';
import { PawnProps, PawnStatus} from '../components/game/Pawn';

// import { PawnProps, PawnStatus } from "../components/Pawn";
// import { PlayerProps, PlayerStatus } from "../components/Player";
// import { TPlayersProps } from "../components/PlayerBoard";
// import { TileProps, TileStatus } from "../components/Tile";

// -----------------------------------------------------------------------------

export interface IGame {
    players: TPlayers
    gs: ccl.IGameState
    selectedPawn: number|null
}

export interface IRenderedBoard {
    // players: TPlayersProps;
    fields: FieldProps[];
    pawns: PawnProps[];
    winner: ccl.EColor|null;
}

export function renderBoard(game: IGame): IRenderedBoard {
    return {
        // players: renderPlayers(game),
        fields: renderTiles(game),
        pawns: renderPawns(game),
        winner: renderWinner(game)
    };
}

// -----------------------------------------------------------------------------

const BOARD = ccl.getBoard().map((row, i) => row.map((field, j) => (
    <FieldProps>{
        key: i + '' + j,
        color: field,
        status: FieldStatus.NORMAL
    }
)));

/*
function renderPlayers(game: IGame): TPlayersProps {
    const playersAlive = ccl.arePlayersAlive(game.gs);

    return {
        [ccl.EColor.RED]:    renderPlayer(game, ccl.EColor.RED,    playersAlive[ccl.EColor.RED]),
        [ccl.EColor.GREEN]:  renderPlayer(game, ccl.EColor.GREEN,  playersAlive[ccl.EColor.GREEN]),
        [ccl.EColor.YELLOW]: renderPlayer(game, ccl.EColor.YELLOW, playersAlive[ccl.EColor.YELLOW]),
        [ccl.EColor.BLUE]:   renderPlayer(game, ccl.EColor.BLUE,   playersAlive[ccl.EColor.BLUE]),
    };
}

function renderPlayer(game: IGame, player: ccl.EColor, alive: boolean): PlayerProps {
    return {
        player: player,
        type: game.players[player],
        status: !alive ? PlayerStatus.DEAD
            : game.gs.whoseTurn === player ? PlayerStatus.ON_TURN : PlayerStatus.OFF_TURN
    };
} // */

function renderTiles(game: IGame): FieldProps[] {
    const moves = game.selectedPawn !== null
        ? ccl.getMoves(game.gs, game.selectedPawn)
        : [];

    const result = BOARD.map((row, i) => {
        return row.map((tile, j) => {
            return <FieldProps>{
                key: tile.key,
                color: tile.color,
                status: !isWithinLimits(i, j, game.gs.limits)
                    ? FieldStatus.DEACTIVATED
                    : isInMoves(i, j, moves)
                        ? FieldStatus.MARKED
                        : FieldStatus.NORMAL
            }
        })
    })

    return flattenArray(result)
}

function isInMoves(i: number, j: number, moves: ccl.IPosition[]): boolean {
    return moves.filter(move => move.row === i && move.col === j).length > 0
}

function isWithinLimits(i: number, j: number, limits: ccl.ILimits): boolean {
    return limits.lower.row <= i && i <= limits.upper.row
        && limits.lower.col <= j && j <= limits.upper.col
}

function renderPawns(game: IGame): PawnProps[] {
    return game.gs.pawns.map((pawn, i) => {
        return {
            key: pawn.player + '' + pawn.roles[0],
            player: pawn.player,
            roles: pawn.roles,
            position: pawn.position,
            status: i === game.selectedPawn ? PawnStatus.SELECTED : PawnStatus.NORMAL,
            currentFieldColor: BOARD[pawn.position.row][pawn.position.col].color 
        }
    })
}

function renderWinner(game: IGame): ccl.EColor|null {
    if (!ccl.isGameOver(game.gs))
        return null;

    const players = ccl.arePlayersAlive(game.gs);

    return players[ccl.EColor.RED]    ? ccl.EColor.RED
        :  players[ccl.EColor.GREEN]  ? ccl.EColor.GREEN
        :  players[ccl.EColor.YELLOW] ? ccl.EColor.YELLOW
        :  players[ccl.EColor.BLUE]   ? ccl.EColor.BLUE
        :  null;
}