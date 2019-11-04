import React, { useState } from "react";
import { View, ViewStyle } from "react-native";
import Button from "../components/Button";
import PlayerPicker from "../components/PlayerPicker";
import Spacer from "../components/Spacer";
import { IViewBaseProps, EViews } from "../App";
import { Texts } from "../assets";
import { deepClone } from "../helper";
import { Game as DBGame } from "../storage";
import { EPlayerType, getNextPlayerType, TPlayers, IGame } from "../types";
import { EColor, initGame } from "chameleon-chess-logic";

/* ---------------------------------- View ---------------------------------- */

interface PlayerConfigProps extends IViewBaseProps {}

const PlayerConfig = (props: PlayerConfigProps) => {
    const [players, setPlayers] = useState(initPlayers)

    function changePlayer(player: EColor) {
        let nextType = getNextPlayerType(players[player])
        let newPlayers = deepClone(players)
        newPlayers[player] = nextType
        setPlayers(newPlayers)
    }

    function beginGame() {
        const gs = initGame(makeGameInitParam(players))
        const Game: IGame = {
            gs: gs,
            players: players,
            selectedPawn: null
        }
        DBGame.set(Game)
        props.navigate(EViews.GAME, Game)
    }

    return (
        <View>
            <View style={style}>
                <PlayerPicker
                    player={EColor.RED}
                    type={players[EColor.RED]}
                    onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.YELLOW}
                    type={players[EColor.YELLOW]}
                    onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.GREEN}
                    type={players[EColor.GREEN]}
                    onPress={changePlayer}
                />
                <PlayerPicker
                    player={EColor.BLUE}
                    type={players[EColor.BLUE]}
                    onPress={changePlayer}
                />
            </View>
            <Spacer size={20} />
            <Button
                text={ Texts.PlayerConfig.beginGame }
                onPress={ beginGame }
                disabled={!canBeginGame(players)}
            />
        </View>
    )
}

export default PlayerConfig;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
}

/* --------------------------------- Logic ---------------------------------- */

const initPlayers: TPlayers = {
    [EColor.RED]: EPlayerType.HUMAN,
    [EColor.GREEN]: EPlayerType.NONE,
    [EColor.YELLOW]: EPlayerType.AI,
    [EColor.BLUE]: EPlayerType.NONE,
}

function makeGameInitParam(players: TPlayers): {[player in EColor]: boolean} {
    return {
        [EColor.RED]:    players[EColor.RED]    !== EPlayerType.NONE,
        [EColor.GREEN]:  players[EColor.GREEN]  !== EPlayerType.NONE,
        [EColor.YELLOW]: players[EColor.YELLOW] !== EPlayerType.NONE,
        [EColor.BLUE]:   players[EColor.BLUE]   !== EPlayerType.NONE,
    }
}

function canBeginGame(players: {[player in EColor]: EPlayerType}): boolean {
    let numOfPlayers = 0
    players[EColor.RED] !== EPlayerType.NONE && numOfPlayers++
    players[EColor.GREEN] !== EPlayerType.NONE && numOfPlayers++
    players[EColor.YELLOW] !== EPlayerType.NONE && numOfPlayers++
    players[EColor.BLUE] !== EPlayerType.NONE && numOfPlayers++
    return numOfPlayers > 1
}