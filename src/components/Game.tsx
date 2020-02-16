import React from 'react';
import { View } from 'react-native';

import * as ccl from 'chameleon-chess-logic';

import { flattenArray } from '../../lib/hd-helper';

// import Popup from './basic/Popup';
import Spacer from './basic/Spacer';
import Board from './game/Board';
import { FieldProps, FieldStatus } from './game/Field';
import { PawnProps, PawnStatus} from './game/Pawn';
import Player, { PlayerProps, EPlayerStatus } from './game/Player';
import Players, { PlayersProps } from './game/Players';

import { getSmallerDim, isScreenHorizontal } from '../models/Device';
import { IGame } from '../models/Game';

// -----------------------------------------------------------------------------

// TODO: Victory -> Popup!
// TODO: Zoom auf handys

interface GameProps {
    gameData: IGame;
}

const Game = (props: GameProps) => {
    const renderedGS = getPropsForRendering(props.gameData);
    const isHorizontal = isScreenHorizontal();

    return (
        <View style={isHorizontal && {flexDirection: 'row', alignItems: 'center'}}>
            <Players {...renderedGS.players} isHorizontal={isHorizontal} />

            <Spacer />

            <View style={{width: getSmallerDim() * .98}}>
                <Board fields={renderedGS.fields} pawns={renderedGS.pawns} />
            </View>
        </View>
    );
}

export default Game;

// -----------------------------------------------------------------------------

interface IRenderedGame {
    players: PlayersProps;
    fields: FieldProps[];
    pawns: PawnProps[];
    winner: ccl.EColor|null;
}

/** Transforms an `IGame` model into the props needed to render the view. */
function getPropsForRendering(game: IGame): IRenderedGame {
    return {
        players: renderPlayers(game),
        fields:  renderTiles  (game),
        pawns:   renderPawns  (game),
        winner:  renderWinner (game),
    };
}

// -----------------------------------------------------------------------------

const BOARD: FieldProps[][] = ccl.getBoard().map((row, i) => row.map((field, j) => ({
    key: i + '' + j,
    color: field,
    status: FieldStatus.NORMAL,
})));


function renderPlayers(game: IGame): PlayersProps {
    const playersAlive = ccl.arePlayersAlive(game);

    return {
        [ccl.EColor.RED]:    renderPlayer(game, ccl.EColor.RED,    playersAlive[ccl.EColor.RED   ]),
        [ccl.EColor.GREEN]:  renderPlayer(game, ccl.EColor.GREEN,  playersAlive[ccl.EColor.GREEN ]),
        [ccl.EColor.YELLOW]: renderPlayer(game, ccl.EColor.YELLOW, playersAlive[ccl.EColor.YELLOW]),
        [ccl.EColor.BLUE]:   renderPlayer(game, ccl.EColor.BLUE,   playersAlive[ccl.EColor.BLUE  ]),
    };
}

function renderPlayer(game: IGame, player: ccl.EColor, alive: boolean): PlayerProps {
    return {
        player: player,
        type: game.players[player],
        status: !alive ? EPlayerStatus.DEAD : game.whoseTurn === player 
            ? EPlayerStatus.ON_TURN : EPlayerStatus.OFF_TURN
    };
}

function renderTiles(game: IGame): FieldProps[] {
    const moves = game.selectedPawn !== null
        ? ccl.getMoves(game, game.selectedPawn)
        : [];

    const result = BOARD.map((row, i) => {
        return row.map((tile, j) => {
            return {
                key: tile.key,
                color: tile.color,
                status: !isWithinLimits(i, j, game.limits)
                    ? FieldStatus.DEACTIVATED
                    : isInMoves(i, j, moves)
                        ? FieldStatus.MARKED
                        : FieldStatus.NORMAL
            };
        });
    });

    return flattenArray(result);
}

function isInMoves(i: number, j: number, moves: ccl.IPosition[]): boolean {
    return moves.filter(move => move.row === i && move.col === j).length > 0;
}

function isWithinLimits(i: number, j: number, limits: ccl.ILimits): boolean {
    return limits.lower.row <= i && i <= limits.upper.row
        && limits.lower.col <= j && j <= limits.upper.col;
}

function renderPawns(game: IGame): PawnProps[] {
    return game.pawns.map((pawn, i) => (
        {
            key: pawn.player + '' + pawn.roles[0],
            player: pawn.player,
            roles: pawn.roles,
            position: pawn.position,
            status: i === game.selectedPawn ? PawnStatus.SELECTED : PawnStatus.NORMAL,
            currentFieldColor: BOARD[pawn.position.row][pawn.position.col].color 
        }
    ));
}

function renderWinner(game: IGame): ccl.EColor|null {
    if (!ccl.isGameOver(game))
        return null;

    const players = ccl.arePlayersAlive(game);

    return players[ccl.EColor.RED]    ? ccl.EColor.RED
        :  players[ccl.EColor.GREEN]  ? ccl.EColor.GREEN
        :  players[ccl.EColor.YELLOW] ? ccl.EColor.YELLOW
        :  players[ccl.EColor.BLUE]   ? ccl.EColor.BLUE
        :  null;
}