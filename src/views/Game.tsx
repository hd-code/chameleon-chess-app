import React, { useState } from "react";
import { View, TouchableWithoutFeedback, ViewStyle } from "react-native";
import Board from "../components/Board";
import PlayerBoard from "../components/PlayerBoard";
import Spacer from "../components/Spacer";
import { renderBoard } from "../render";
import { IGame } from "../types";
import { IViewBaseProps } from "../App";
import { IPosition, advanceGame, getIndexOfPawnOnField } from "chameleon-chess-logic";

// TODO: Victory -> Popup
// TODO: AI plays on its own
// TODO: Going Back to Home
// TODO: Layout animation

/* ---------------------------------- View ---------------------------------- */

interface GameProps extends IViewBaseProps { gameData: IGame }

const Game = (props: GameProps) => {
    GameData = GameData || props.gameData
    const [game, setGame] = useState(renderBoard(GameData))

    function onLayout(event: any) { board = event.nativeEvent.layout }

    function onPress(event: any) {
        const {locationX, locationY} = event.nativeEvent
        const click = calcClickPos(locationX, locationY)
        GameData = handleClick(click, GameData)
        setGame(renderBoard(GameData))
    }

    return (
        <View>
            <PlayerBoard players={game.players} />
            <Spacer size={20} />
            <View onLayout={onLayout}>
                <Board {...game} />
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={touchableStyle} />
                </TouchableWithoutFeedback>
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

// global variables:

// here there current state of the game is stored
let GameData: IGame

// holds the board size, needed to get the click position on the board
let board = { height: 0, width:  0 }

function calcClickPos(x: number, y: number): IPosition {
    return {
        row: Math.floor(y / board.height * 8),
        col: Math.floor(x / board.width  * 8)
    }
}

// handles click on the field, changes game state if neccessary
function handleClick(click: IPosition, game:IGame): IGame {
    if (game.selectedPawn !== null) {
        const newGS = advanceGame(game.gs, game.selectedPawn, click)

        if (newGS !== null) {
            return {
                players: game.players,
                gs: newGS,
                selectedPawn: null
            }
        }
    }

    const pawnOnClickedField = getIndexOfPawnOnField(game.gs, click)

    return {
        players: game.players,
        gs: game.gs,
        selectedPawn: pawnOnClickedField
    }
}