import React from "react";
import { View, ViewStyle, TouchableOpacity, LayoutAnimation } from "react-native";

import * as ccl from 'chameleon-chess-logic';

import { IAppController } from "../App";
import AppState from "../AppState";
import { Styles } from "../helper";

import Board from './game/Board';
import Players from './game/Players';
import Spacer from './basic/Spacer';
import getPropsForRendering from './game/render';

import * as GameModel from "../models/Game";

// -----------------------------------------------------------------------------

// TODO: mark current player
// TODO: Victory -> Popup!
// TODO: Zoom auf handys

interface GameProps {
    controller: IAppController;
}

const Game = (props: GameProps) => {
    const GameData = AppState.Game.get() || t;
    const renderGS = getPropsForRendering(GameData);

    function makeMove() {
        // if pawns have moved, activate LayoutAnimation
        if (GameModel.havePawnsMoved(GameData, AppState.Game.get() || t))
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        props.controller.reRender();
    }

    // if it is computer's turn, do computer move asynchronously
    GameModel.isComputerTurn(GameData) && setTimeout(() => doComputerMove(GameData, makeMove), 1);

    return (
        <View>
            <Players {...renderGS.players} />
            <Spacer />
            <View>
                <Board fields={renderGS.fields} pawns={renderGS.pawns} />
                <TouchableOpacity
                    onPress={ event => handlePressOnBoard(event) && makeMove() }
                    onLayout={ measureBoardSize }
                    style={ Styles.coverParent }
                    activeOpacity={1}
                />
            </View>
        </View>
    );
}

export default Game;

// -----------------------------------------------------------------------------

const MIN_SLEEP_FOR_AI_MOVE = 1500;

/** This is used to trick typescript. AppState.Game.get() might return null.
 * However, the user will not get to this view in that case. But typescript does
 * not know that. Therefore, just use it like this: `AppState.Game.get() || t`.
 * That way typescript will let you proceed. */
let t: GameModel.IGame;

type TDimensions = { width: number, height: number };

/** This variable stores the dimensions of the board as soon as they are available. */
let board: TDimensions = { height: 0, width:  0 };

function measureBoardSize(event: any) {
    board = event.nativeEvent.layout;
}

function calcClickPos(x: number, y: number, dim: TDimensions): ccl.IPosition {
    return {
        row: Math.floor(y / dim.height * 8),
        col: Math.floor(x / dim.width  * 8)
    };
}

/** Returns true if the game state has changed, false if not */
function handlePressOnBoard(event: any): boolean {
    const {locationX, locationY} = event.nativeEvent;
    const clickPos = calcClickPos(locationX, locationY, board);

    const currentGameData = AppState.Game.get() || t;
    if (GameModel.isComputerTurn(currentGameData))
        return false;

    const newGameData = GameModel.advanceGame(currentGameData, clickPos);
    AppState.Game.set(newGameData);

    return true;
}

/** `refresh` function is called, once the computer is done, calculating the move */
function doComputerMove(currentGameData: GameModel.IGame, refresh: () => void) {
    const start = Date.now();

    const newGameData = GameModel.letComputerAdvanceGame(currentGameData);

    const duration = Date.now() - start;
    const sleep = Math.max(MIN_SLEEP_FOR_AI_MOVE - duration, 1);

    setTimeout(() => {
        AppState.Game.set(newGameData);
        refresh();
    }, sleep);
}