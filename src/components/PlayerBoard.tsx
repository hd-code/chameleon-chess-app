import React from "react";
import { View, ViewStyle } from "react-native";
import Player, { PlayerProps } from "./Player";
import { EColor } from "chameleon-chess-logic";

const style: ViewStyle = {
    flexWrap: 'wrap',
    flexDirection:'row'
}

export type TPlayers = {[player in EColor]: PlayerProps}

export interface PlayerBoardProps {
    players: TPlayers
}

const PlayerBoard = (props: PlayerBoardProps) => (
    <View style={style}>
        <Player {...props.players[EColor.RED]} />
        <Player {...props.players[EColor.GREEN]} />
        <Player {...props.players[EColor.YELLOW]} />
        <Player {...props.players[EColor.BLUE]} />
    </View>
)

export default PlayerBoard;