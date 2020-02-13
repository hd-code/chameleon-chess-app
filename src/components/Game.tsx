import React from 'react';
import { View, ViewStyle, TouchableOpacity, LayoutAnimation } from 'react-native';

import { IPosition, isGameOver, EColor } from 'chameleon-chess-logic';

import { IAppController } from '../App';
import AppState from '../AppState';
import { Styles } from '../helper';

import Board from './game/Board';
import Button from './basic/Button';
import Players from './game/Players';
import Popup from './basic/Popup';
import Spacer from './basic/Spacer';
import Text from './basic/Text';
import getPropsForRendering from './game/render';

import * as GameModel from '../models/Game';
import { getTexts } from '../models/Texts';

// -----------------------------------------------------------------------------

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

    function replayGame() {
        const newGameData = GameModel.createGame(GameData.players);
        if (!newGameData)
            return console.error('IGame Object could not be created!');
            
        AppState.Game.set(newGameData);
        props.controller.goTo.Game();
    }

    // if game is over, remove game data in local storage
    if (isGameOver(GameData.gs)) {
        AppState.Game.rmv();
    }

    // if it is computer's turn, do computer move asynchronously
    else if (GameModel.isComputerTurn(GameData)) {
        setTimeout(() => doComputerMove(GameData, makeMove), 1);
    }

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
            <Popup visible={isGameOver(GameData.gs)}>
                <Text>{getWinnerText(GameData)}</Text>
                <Button text={getTexts().Game.victoryPopup.homeButton} onPress={props.controller.goTo.Home} />
                <Button text={getTexts().Game.victoryPopup.replayButton} onPress={replayGame} />
                <Button text={getTexts().Game.victoryPopup.newGame} onPress={props.controller.goTo.PlayerConfig} />
            </Popup>
        </View>
    );
}

export default Game;

// -----------------------------------------------------------------------------

const MIN_SLEEP_FOR_AI_MOVE = 1500;

/** This is used to trick typescript. The function `AppState.Game.get()` might
 * return `null`. Therefore typescript throws an error whenever you call it and
 * assign its return value to a variable. However, the user cannot get to this
 * view, when there is no saved game. So, the function actually never returns
 * `null` on this view. To shut up the typescript errors just use the function
 * like this: `AppState.Game.get() || t`. No further `null` checking is required. */
let t: GameModel.IGame;

type TDimensions = { width: number, height: number };

/** This variable stores the dimensions of the board as soon as they are available. */
let board: TDimensions = { height: 0, width:  0 };

/** Measures the board size using the onLayout event. Dimensions get stored to
 * the variable `board`. */
function measureBoardSize(event: any) {
    board = event.nativeEvent.layout;
}

function calcClickPos(x: number, y: number): IPosition {
    return {
        row: Math.floor(y / board.height * 8),
        col: Math.floor(x / board.width  * 8)
    };
}

/** Returns true if the game state has changed, false if not */
function handlePressOnBoard(event: any): boolean {
    const {locationX, locationY} = event.nativeEvent;
    const clickPos = calcClickPos(locationX, locationY);

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

function getWinnerText(game: GameModel.IGame): string {
    const winner = GameModel.getWinner(game);
    if (winner === null)
        return '';

    return getTexts().Game.winner[winner];
}