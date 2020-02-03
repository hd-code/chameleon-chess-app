import React from "react";
import { View, ViewStyle, ImageStyle } from "react-native";

import { EColor } from 'chameleon-chess-logic';

import { Styles } from '../../helper';

import Player, { PlayerProps } from './Player';

// -----------------------------------------------------------------------------

export type PlayersProps = {[player in EColor]: PlayerProps}

const PlayerBoard = (props: PlayersProps) => (
    <View style={Styles.flex}>
        <Player style={playerStyle} {...props[EColor.RED]} />
        <Player style={playerStyle} {...props[EColor.BLUE]} />
        <Player style={playerStyle} {...props[EColor.YELLOW]} />
        <Player style={playerStyle} {...props[EColor.GREEN]} />
    </View>
)

export default PlayerBoard;

// -----------------------------------------------------------------------------

const playerStyle: ViewStyle = {
    width: '25%'
}