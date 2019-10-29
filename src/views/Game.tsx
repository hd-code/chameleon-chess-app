import React, { useState } from "react";
import { View } from "react-native";
import { initGame, EColor, IPosition } from "chameleon-chess-logic";
import Board from "../components/Board";
import PlayerBoard from "../components/PlayerBoard";
import { renderBoard } from "../aux/render";
import * as db from "../aux/storage";
import { IGame, handleClick } from "../aux/game";

const GS = initGame({[EColor.RED]: true, [1]:true, [2]: true, [3]:false})
db.Game.set(GS)

const PB = {
    [EColor.RED]: 1,
    [EColor.GREEN]: 2,
    [EColor.YELLOW]: 1,
    [EColor.BLUE]: 0,
}

let GameData: IGame = {
    gs: GS,
    players: PB,
    selectedPawn: null
}

const test = renderBoard(GameData)

const Game = () => {
    const [game, setGame] = useState(test)

    function onClick(click: IPosition) {
        GameData = handleClick(click, GameData)
        const nextGameFrame = renderBoard(GameData)
        setGame(nextGameFrame)
    }

    let dimensions = {
        height: 0,
        width:  0
    }
    function getDimensions(event: any) {
        dimensions.height = event.nativeEvent.layout.height
        dimensions.width  = event.nativeEvent.layout.width
    }

    function onPress(event: any) {
        const clickX = event.nativeEvent.locationX
        const clickY = event.nativeEvent.locationY
        const click: IPosition = {
            row: Math.floor((clickX / dimensions.width) * 8),
            col: Math.floor((clickY / dimensions.width) * 8)
        }
        console.log(clickX);
    }

    return (
        <View>
            <PlayerBoard players={game.players} />
            <Board {...game} />
        </View>
    )
}

export default Game;