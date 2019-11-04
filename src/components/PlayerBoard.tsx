import React from "react";
import { View, ViewStyle } from "react-native";
import Player, { PlayerProps } from "./Player";
import { EColor } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

export type TPlayers = {[player in EColor]: PlayerProps}

export interface PlayerBoardProps {
    players: TPlayers
}

const PlayerBoard = (props: PlayerBoardProps) => (
    <View style={style}>
        <Player {...props.players[EColor.RED]} />
        <Player {...props.players[EColor.BLUE]} />
        <Player {...props.players[EColor.YELLOW]} />
        <Player {...props.players[EColor.GREEN]} />
    </View>
)

export default PlayerBoard;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    flexWrap: 'wrap',
    flexDirection:'row'
}

/* --------------------------------- Assets --------------------------------- */