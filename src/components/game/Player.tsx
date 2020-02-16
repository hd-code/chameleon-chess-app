import React from 'react';
import { View, ViewStyle, ImageStyle, TouchableOpacity } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize, Styles } from '../../models/Device';

import Image from '../basic/Image';
import Overlay, { OverlayType } from '../basic/Overlay';
import Spacer from '../basic/Spacer';
import Text from '../basic/Text';

// import { getColors } from '../../models/Colors';
// import { getImages } from '../../models/Images';
import { EPlayerType } from '../../models/Players';
import { getTexts } from '../../models/Texts';

// -----------------------------------------------------------------------------

export enum EPlayerStatus { DEAD, OFF_TURN, ON_TURN }

export interface PlayerProps {
    player: EColor;
    type: EPlayerType;
    status?: EPlayerStatus;
    verbose?: boolean;
    onPress?: (event: any) => void;
}

const Player = (props: PlayerProps) => (
    <View 
        style={[WRAPPER_STYLE,
            {backgroundColor: COLORS[props.player]},
        ]}
    >
        <Text>{getTexts().players[props.player]}</Text>

        <Spacer scale={.3} />

        <View style={IMG_WRAPPER_STYLE}>
            <Image source={ICONS[props.type]} />
        </View>
        
        {props.status === EPlayerStatus.DEAD && <Overlay type={OverlayType.DARKER} />}
        {/* {props.status === EPlayerStatus.ON_TURN && <Overlay type={OverlayType.WHITE_FRAME} />} */}
        {props.onPress && <TouchableOpacity style={Styles.coverParent} onPress={props.onPress} />}
    </View>
)

export default Player;

// -----------------------------------------------------------------------------

const COLORS: {[color in EColor]: string} = {
    [EColor.RED]:    '#B9542D',
    [EColor.GREEN]:  '#51A230',
    [EColor.YELLOW]: '#DDBB71',
    [EColor.BLUE]:   '#04909D',
}

const EDGE_WIDTH = getBaseFontSize() * .5;

const WRAPPER_STYLE: ViewStyle = {
    alignItems: 'center',
    borderWidth: 1,
    padding: EDGE_WIDTH,
}

const IMAGE_SIZE = getBaseFontSize() * 3;

const IMG_WRAPPER_STYLE: ViewStyle = {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
}

const ICONS = {
    [EPlayerType.NONE]:  require('../../../assets/images/none.png'),
    [EPlayerType.HUMAN]: require('../../../assets/images/human.png'),
    [EPlayerType.AI]:    require('../../../assets/images/computer.png'),
}

const TEXTS = {
    
}