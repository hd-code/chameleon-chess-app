import React, { useState } from "react";
import { View, ViewStyle, LayoutAnimation, TouchableOpacity } from "react-native";

import Board from "../components/Board";
import PlayerBoard from "../components/PlayerBoard";
import Spacer from "../components/Spacer";

import { getUnixTimestamp, deepClone } from "../helper";
import { ViewProps } from "../navigation";
import { renderBoard } from "../render";
import { Game as DBGame } from "../storage";
import { IGame, EPlayerType } from "../types";

import { IPosition, advanceGame, getIndexOfPawnOnField, letComputerAdvanceGame } from "chameleon-chess-logic";

// TODO: Victory -> Popup
// FIXME: Layout animation -> strange behaviour for beating

/* ---------------------------------- View ---------------------------------- */

interface GameProps extends ViewProps {}

const Game = (props: GameProps) => {
    const [GameData, setGameData] = useState(DBGame.get() || t)

    function makeMove(newGameData: IGame) {
        // if pawns have moved -> enable layout animation
        if (havePawnsMoved(GameData, newGameData)) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }

        // save gameData to props, to storage and render it
        DBGame.set(newGameData)
        setGameData(newGameData)
    }

    function handlePressOnBoard(event: any) {
        // calc click position
        const {locationX, locationY} = event.nativeEvent
        const click = calcClickPos(locationX, locationY)

        // handle click, makeMove if one was made
        const newGameData = handleClick(click, GameData)
        newGameData && makeMove(newGameData)
    }

    function doComputerMove() {
        const startTime = getUnixTimestamp()
        const newGS = letComputerAdvanceGame(GameData.gs)

        const endTime = getUnixTimestamp()
        const sleep = Math.max(MAX_TIME_FOR_COMPUTER_TURN - (endTime - startTime), 0)

        const newGameData: IGame = {
            players: GameData.players,
            gs: newGS,
            selectedPawn: null
        }

        setTimeout(() => makeMove(newGameData), sleep * 1000)
    }

    // if computer turn, let computer make move and render it
    isComputerTurn(GameData) && setTimeout(doComputerMove, 200)

    // prepare data structure for rendering
    const gameRender = renderBoard(GameData)

    return (
        <View>
            <PlayerBoard players={gameRender.players} />
            <Spacer size={20} />
            <View>
                <Board {...gameRender} />
                <TouchableOpacity
                    onPress={handlePressOnBoard}
                    onLayout={ (e) => board = e.nativeEvent.layout }
                    style={touchableStyle}
                    activeOpacity={1}
                />
            </View>
        </View>
    )
}

export default Game;

/* --------------------------------- Styles --------------------------------- */

const touchableStyle: ViewStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
}

/* --------------------------------- Logic ---------------------------------- */

// this is for tricking typescript
let t: IGame

// holds the board size, needed to get the click position on the board
let board = { height: 0, width:  0 }
function calcClickPos(x: number, y: number): IPosition {
    return {
        row: Math.floor(y / board.height * 8),
        col: Math.floor(x / board.width  * 8)
    }
}

const MAX_TIME_FOR_COMPUTER_TURN = 1

function isComputerTurn(game: IGame): boolean {
    return game.players[game.gs.whoseTurn] === EPlayerType.AI
}

// handles click on the field, changes game state if necessary
function handleClick(click: IPosition, game:IGame): IGame|null {
    if (isComputerTurn(game))
        return null

    const newGS = game.selectedPawn !== null
        ? advanceGame(game.gs, game.selectedPawn, click)
        : null

    const pawnOnClickedField = getIndexOfPawnOnField(game.gs, click)

    return {
        players: game.players,
        gs: newGS || game.gs,
        selectedPawn: newGS === null ? pawnOnClickedField : null
    }
}

function havePawnsMoved(oldGame: IGame, newGame: IGame): boolean {
    if (oldGame.gs.whoseTurn === newGame.gs.whoseTurn)
        return false

    const oPawns = oldGame.gs.pawns
    const nPawns = newGame.gs.pawns

    if (oPawns.length !== nPawns.length)
        return true

    const pawnsOnSamePosition = oPawns.filter(
        (_,i) => isSamePosition(oPawns[i].position, nPawns[i].position)
    )

    return pawnsOnSamePosition.length < oPawns.length
}

function isSamePosition(a: IPosition, b: IPosition): boolean {
    return a.row === b.row && a.col === b.col
}