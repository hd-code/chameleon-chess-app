import React from "react";
import { View, ViewStyle, TouchableOpacity, LayoutAnimation } from "react-native";

import * as ccl from 'chameleon-chess-logic';

import { IAppController } from "../App";
import AppState from "../AppState";

import { IGame } from "../models/Game";
import { EPlayerType } from "../models/PlayerType";

import Board from './game/Board';
import getPropsForRendering from './game/render';

// -----------------------------------------------------------------------------

interface GameProps {
    controller: IAppController;
}

const Game = (props: GameProps) => {
    const GameData = AppState.Game.get() || t;
    const renderGS = getPropsForRendering(GameData);

    function makeMove() {
        // if pawns have moved, activate LayoutAnimation
        if (havePawnsMoved(GameData, AppState.Game.get() || t))
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        props.controller.render();
    }

    // if it is computer's turn, do computer move asynchronously
    isComputerTurn(GameData) && setTimeout(() => doComputerMove(GameData, makeMove), 1);

    return (
        <View>
            <Board fields={renderGS.fields} pawns={renderGS.pawns} />
            <TouchableOpacity
                onPress={ event => handlePressOnBoard(event) && makeMove() }
                onLayout={ measureBoardSize }
                style={touchableStyle}
                activeOpacity={1}
            />
        </View>
    );
}

export default Game;

// -----------------------------------------------------------------------------

const MIN_SLEEP_FOR_AI_MOVE = 1500;

const touchableStyle: ViewStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
};

/** This is used to trick typescript. AppState.Game.get() might return null.
 * However, the user will not get to this view in that case. But typescript does
 * not know that. Therefore, just use it like this: `AppState.Game.get() || t`.
 * That way typescript will let you proceed. */
let t: IGame;

type TDimensions = { width: number, height: number };

/** This variable stores the dimensions of the board as soon as they are available. */
let board: TDimensions = { height: 0, width:  0 };

function measureBoardSize(event: any) {
    board = event.nativeEvent.layout;
}

/** Returns true if the game state has changed, false if not */
function handlePressOnBoard(event: any): boolean {
    const {locationX, locationY} = event.nativeEvent;
    const clickPos = calcClickPos(locationX, locationY, board);

    const currentGameData = AppState.Game.get() || t;
    if (isComputerTurn(currentGameData))
        return false;

    const newGameData = advanceGame(clickPos, currentGameData);
    AppState.Game.set(newGameData);

    return true;
}

/** `refresh` function is called, once the computer is done, calculating the move */
function doComputerMove(currentGameData: IGame, refresh: () => void) {
    const start = Date.now();

    const newGameData: IGame = {
        players: currentGameData.players,
        gs: ccl.letComputerMakeMove(currentGameData.gs),
        selectedPawn: null
    };

    const duration = Date.now() - start;
    const sleep = Math.max(MIN_SLEEP_FOR_AI_MOVE - duration, 1);

    setTimeout(() => {
        AppState.Game.set(newGameData);
        refresh();
    }, sleep);
}

// -----------------------------------------------------------------------------

function calcClickPos(x: number, y: number, dim: TDimensions): ccl.IPosition {
    return {
        row: Math.floor(y / dim.height * 8),
        col: Math.floor(x / dim.width  * 8)
    };
}

function advanceGame(click: ccl.IPosition, game:IGame): IGame {
    const newGS = game.selectedPawn !== null
        ? ccl.makeMove(game.gs, game.selectedPawn, click)
        : null;

    const pawnOnClickedField = ccl.getIndexOfPawnAtPosition(game.gs, click);

    return {
        players: game.players,
        gs: newGS || game.gs,
        selectedPawn: newGS === null ? pawnOnClickedField : null
    };
}

function isComputerTurn(game: IGame): boolean {
    return game.players[game.gs.whoseTurn] === EPlayerType.AI;
}

function havePawnsMoved(oldGame: IGame, newGame: IGame): boolean {
    return oldGame.gs.whoseTurn !== newGame.gs.whoseTurn;
}