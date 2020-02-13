import React from 'react';
import { View, ViewStyle, ImageStyle } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { Styles } from '../../helper';

import Player, { PlayerProps } from './Player';

// -----------------------------------------------------------------------------

export type PlayersProps = {[player in EColor]: PlayerProps}

const PlayerBoard = (props: PlayersProps) => (
    <View style={Styles.flex}>
        <Player style={PLAYER_STYLE} {...props[EColor.RED]} />
        <Player style={PLAYER_STYLE} {...props[EColor.BLUE]} />
        <Player style={PLAYER_STYLE} {...props[EColor.YELLOW]} />
        <Player style={PLAYER_STYLE} {...props[EColor.GREEN]} />
    </View>
)

export default PlayerBoard;

// -----------------------------------------------------------------------------

const PLAYER_STYLE: ViewStyle = {
    width: '25%'
}