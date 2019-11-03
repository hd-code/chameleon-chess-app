import React, { useState } from "react";
import { View, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { IPosition } from "chameleon-chess-logic";
import Board from "../components/Board";
import PlayerBoard from "../components/PlayerBoard";
import { renderBoard } from "../aux/render";
import { IGame, handleClick } from "../aux/game";
import Spacer from "../components/Spacer";
import { IViewBaseProps } from "../App";

let GameData: IGame

let board = { height: 0, width:  0 }

const touchableStyle: ViewStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
}

interface GameProps extends IViewBaseProps {
    gameData: IGame
}

// TODO: Victory -> Popup
// TODO: AI plays on its own
// TODO: Going Back to Home
// TODO: Layout animation

const Game = (props: GameProps) => {
    GameData = GameData || props.gameData
    const [game, setGame] = useState(renderBoard(GameData))

    function onLayout(event: any) { board = event.nativeEvent.layout }

    function onPress(event: any) {
        const {locationX, locationY} = event.nativeEvent
        const click: IPosition = {
            row: Math.floor(locationY / board.height * 8),
            col: Math.floor(locationX / board.width  * 8)
        }
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