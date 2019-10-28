import React from "react";
import { View } from "react-native";
import { initGame, EColor } from "chameleon-chess-logic";
import Board from "../components/Board";
import PlayerBoard from "../components/PlayerBoard";
import { renderGameState } from "../aux/render";
import * as db from "../aux/storage";

const GS = initGame({[EColor.RED]: true, [1]:true, [2]: true, [3]:false})
db.Game.set(GS)


const test = renderGameState(GS)

const PB = {
    [EColor.RED]: {
        player: EColor.RED,
        name: 'Spieler Rot',
        status: 1,
        type: 1
    },
    [EColor.GREEN]: {
        player: EColor.GREEN,
        name: 'Spieler Rot',
        status: 2,
        type: 0
    },
    [EColor.YELLOW]: {
        player: EColor.YELLOW,
        name: 'Spieler Rot',
        status: 2,
        type: 1
    },
    [EColor.BLUE]: {
        player: EColor.BLUE,
        name: 'Spieler Rot',
        status: 2,
        type: 2
    },
}

const Game = () => (
    <View>
        <PlayerBoard players={PB} />
        <Board {...test} />
    </View>
)

export default Game;