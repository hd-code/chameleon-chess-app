import React from "react";
import { View, ViewStyle, ImageStyle, TouchableOpacity } from "react-native";

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize, Styles } from '../../helper';

import Image from '../basic/Image';
import Overlay, { OverlayType } from '../basic/Overlay';
import Spacer from '../basic/Spacer';
import Text from '../basic/Text';

import { getColors } from '../../models/Colors';
import { getImages } from '../../models/Images';
import { EPlayerType } from '../../models/PlayerType';
import { getTexts } from '../../models/Texts';

// -----------------------------------------------------------------------------

export enum EPlayerStatus { DEAD, OFF_TURN, ON_TURN }

export interface PlayerProps {
    player: EColor;
    type: EPlayerType;
    status?: EPlayerStatus;
    style?: ViewStyle;
    onPress?: (event: any) => void;
}

const Player = (props: PlayerProps) => (
    <View 
        style={[WRAPPER_STYLE,
            {backgroundColor: getColors().main[props.player]},
            props.style
        ]}
    >
        <Text>{getTexts().players[props.player]}</Text>
        <Spacer scale={.3} />
        <View style={IMG_WRAPPER_STYLE}>
            <Image source={ICONS[props.type]} style={Styles.coverParent as ImageStyle} />
        </View>
        {props.status === EPlayerStatus.DEAD && <Overlay type={OverlayType.DARKER} />}
        {props.status === EPlayerStatus.ON_TURN && <Overlay type={OverlayType.WHITE_FRAME} />}
        {props.onPress && <TouchableOpacity style={Styles.coverParent} onPress={props.onPress} />}
    </View>
)

export default Player;

// -----------------------------------------------------------------------------

const EDGE_WIDTH = getBaseFontSize() * .5;

const WRAPPER_STYLE: ViewStyle = {
    alignItems: 'center',
    borderWidth: 1,
    padding: EDGE_WIDTH,
}

const IMAGE_SIZE = getBaseFontSize() * 3;

const IMG_WRAPPER_STYLE: ViewStyle = {
    width: IMAGE_SIZE,
    paddingBottom: IMAGE_SIZE,
}

const ICONS = {
    [EPlayerType.NONE]:  getImages().NoPlayer,
    [EPlayerType.HUMAN]: getImages().Human,
    [EPlayerType.AI]:    getImages().AI,
}