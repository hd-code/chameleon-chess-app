import React, { useState } from "react";
import { View, ViewStyle } from "react-native";

import Button from "../components/Button";
import PlayerPicker from "../components/PlayerPicker";
import Spacer from "../components/Spacer";

import { Texts } from "../assets";
import { deepClone } from "../helper";
import { ViewProps } from "../navigation";
import { Game as DBGame } from "../storage";
import { EPlayerType, getNextPlayerType, TPlayers, IGame } from "../types";

import { EColor, initGame } from "chameleon-chess-logic";

/* ---------------------------------- View ---------------------------------- */

interface PlayerConfigProps extends ViewProps {}

const PlayerConfig = (props: PlayerConfigProps) => {
    const [players, setPlayers] = useState(initPlayers)

    function changePlayer(player: EColor) {
        const nextType = getNextPlayerType(players[player])
        let newPlayers = deepClone(players)
        newPlayers[player] = nextType
        setPlayers(newPlayers)
    }

    function beginGame() {
        const gs = initGame(
            players[EColor.RED]    !== EPlayerType.NONE,
            players[EColor.GREEN]  !== EPlayerType.NONE,
            players[EColor.YELLOW] !== EPlayerType.NONE,
            players[EColor.BLUE]   !== EPlayerType.NONE,
        )
        if (!gs) {
            console.error('Game State could not be created')
            return
        }

        const GameData: IGame = {
            gs: gs,
            players: players,
            selectedPawn: null
        }
        DBGame.set(GameData)
        props.navigate.game()
    }

    return (
        <View>
            <View style={wrapperStyle}>
                <PlayerPicker
                    player={EColor.RED} type={players[EColor.RED]}
                    wrapperStyle={playerPickerStyle} onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.YELLOW} type={players[EColor.YELLOW]}
                    wrapperStyle={playerPickerStyle} onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.GREEN} type={players[EColor.GREEN]}
                    wrapperStyle={playerPickerStyle} onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.BLUE} type={players[EColor.BLUE]}
                    wrapperStyle={playerPickerStyle} onPress={changePlayer}
                />
            </View>
            <Spacer size={20} />
            <Button
                text={ Texts.PlayerConfig.beginGame }
                onPress={ beginGame }
                disabled={ !canBeginGame(players) }
            />
        </View>
    )
}

export default PlayerConfig;

/* --------------------------------- Styles --------------------------------- */

const wrapperStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
}

const playerPickerStyle: ViewStyle = {
    width: '25%'
}

/* --------------------------------- Logic ---------------------------------- */

const initPlayers: TPlayers = {
    [EColor.RED]: EPlayerType.HUMAN,
    [EColor.GREEN]: EPlayerType.NONE,
    [EColor.YELLOW]: EPlayerType.AI,
    [EColor.BLUE]: EPlayerType.NONE,
}

function canBeginGame(players: {[player in EColor]: EPlayerType}): boolean {
    let numOfPlayers = 0
    players[EColor.RED]    !== EPlayerType.NONE && numOfPlayers++
    players[EColor.GREEN]  !== EPlayerType.NONE && numOfPlayers++
    players[EColor.YELLOW] !== EPlayerType.NONE && numOfPlayers++
    players[EColor.BLUE]   !== EPlayerType.NONE && numOfPlayers++
    return numOfPlayers > 1
}