import React from "react";
import { View, ViewStyle } from "react-native";

import Player, { PlayerProps } from "./Player";

import { EColor } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

export type TPlayersProps = {[player in EColor]: PlayerProps}

export interface PlayerBoardProps {
    players: TPlayersProps
}

const PlayerBoard = (props: PlayerBoardProps) => (
    <View style={style}>
        <Player style={playerStyle} {...props.players[EColor.RED]} />
        <Player style={playerStyle} {...props.players[EColor.BLUE]} />
        <Player style={playerStyle} {...props.players[EColor.YELLOW]} />
        <Player style={playerStyle} {...props.players[EColor.GREEN]} />
    </View>
)

export default PlayerBoard;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    flexWrap: 'wrap',
    flexDirection:'row'
}

const playerStyle: ViewStyle = {
    width: '25%'
}

/* --------------------------------- Assets --------------------------------- */