import React from 'react';
import { View, ViewStyle, ImageStyle } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { Styles } from '../../models/Device';

import Player, { PlayerProps } from './Player';

// -----------------------------------------------------------------------------

export type PlayersProps = {[player in EColor]: PlayerProps}

interface Test extends PlayersProps {
    isHorizontal: boolean;
}

const PlayerBoard = (props: Test) => (
    <View style={!props.isHorizontal && {flexDirection: 'row'}}>
        <View style={!props.isHorizontal && PLAYER_STYLE}>
            <Player {...props[EColor.RED]} />
        </View>

        <View style={!props.isHorizontal && PLAYER_STYLE}>
            <Player {...props[EColor.BLUE]} />
        </View>

        <View style={!props.isHorizontal && PLAYER_STYLE}>
            <Player {...props[EColor.YELLOW]} />
        </View>

        <View style={!props.isHorizontal && PLAYER_STYLE}>
            <Player {...props[EColor.GREEN]} />
        </View>
    </View>
)

export default PlayerBoard;

// -----------------------------------------------------------------------------

const PLAYER_STYLE: ViewStyle = {
    width: '25%'
}