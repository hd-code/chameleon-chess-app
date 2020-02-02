import React from "react";
import { View, ViewStyle, TouchableOpacity, LayoutAnimation } from "react-native";

import * as ccl from 'chameleon-chess-logic';

import { IAppController } from "../App";
import AppState from "../AppState";

import { IGame, renderBoard } from "../models/Game";
import { EPlayerType } from "../models/PlayerType";

import Board from './game/Board';

// -----------------------------------------------------------------------------

interface GameProps {
    controller: IAppController;
}

const Game = (props: GameProps) => {
    const GameData = AppState.Game.get() || t;
    const renderGS = renderBoard(GameData);

    function makeMove() {
        // if pawns have moved, activate LayoutAnimation
        if (havePawnsMoved(GameData, AppState.Game.get() || t))
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        props.controller.render();
    }

    // if it is computer turn, do computer turn, but do it asynchronous
    isComputerTurn(GameData) && setTimeout(() => doComputerMove(GameData, makeMove), 1);

    return (
        <View>
            <Board fields={renderGS.fields} pawns={renderGS.pawns} />
            <TouchableOpacity
                onPress={ event => handlePressOnBoard(event) && makeMove() }
                onLayout={ (e) => board = e.nativeEvent.layout }
                style={touchableStyle}
                activeOpacity={1}
            />
        </View>
    )
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
 * That way typescripts will let proceed. */
let t: IGame;

/** This variable stores the dimensions of the board as soon as they are available. */
let board = { height: 0, width:  0 };

function calcClickPos(x: number, y: number): ccl.IPosition {
    return {
        row: Math.floor(y / board.height * 8),
        col: Math.floor(x / board.width  * 8)
    };
}

function handlePressOnBoard(event: any): boolean {
    // calc click position
    const {locationX, locationY} = event.nativeEvent;
    const click = calcClickPos(locationX, locationY);

    // handle click, makeMove if one was made
    const newGameData = handleClick(click, AppState.Game.get() || t);

    if (newGameData) {
        AppState.Game.set(newGameData);
        return true;
    }

    return false;
}

// handles click on the field, changes game state if necessary
function handleClick(click: ccl.IPosition, game:IGame): IGame|null {
    if (isComputerTurn(game))
        return null;

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

function doComputerMove(GameData: IGame, refresh: () => void) {
    const start = Date.now();
    setNewGameData(GameData);
    const end = Date.now();
    const duration = end - start;

    const sleep = Math.max(MIN_SLEEP_FOR_AI_MOVE - duration, 0);

    setTimeout(refresh, sleep);
}

function setNewGameData(currentGameData: IGame) {
    const newGameData: IGame = {
        players: currentGameData.players,
        gs: ccl.letComputerMakeMove(currentGameData.gs),
        selectedPawn: null
    };
    AppState.Game.set(newGameData);
}

function isComputerTurn(game: IGame): boolean {
    return game.players[game.gs.whoseTurn] === EPlayerType.AI;
}

function havePawnsMoved(oldGame: IGame, newGame: IGame): boolean {
    return oldGame.gs.whoseTurn !== newGame.gs.whoseTurn;
}