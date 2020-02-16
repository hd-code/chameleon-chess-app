import React from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize } from '../../models/Device';
import { getColors } from '../../models/Colors';

import Overlay, { OverlayType } from './Overlay';
import Text, { ETextType } from './Text';

// -----------------------------------------------------------------------------

export interface ButtonProps {
    text: string;
    onPress: () => void;
    color: EColor;
    disabled?: boolean;
    // fullWidth?: boolean;
}

const Button = (props: ButtonProps) => (
    <TouchableOpacity
        onPress={ !props.disabled ? props.onPress : () => {} }
        activeOpacity={ !props.disabled ? .9 : 1 }
        style={[BOX_STYLE, {backgroundColor: getColors().main[props.color]}]}
    >
        <Text type={ETextType.BUTTON}>{props.text}</Text>
        {props.disabled && <Overlay type={OverlayType.GREY_OUT} borderRadius={PADDING} />}
    </TouchableOpacity>
);

export default Button;

// -----------------------------------------------------------------------------

const PADDING = getBaseFontSize() * .8;

const BOX_STYLE: ViewStyle = {
    borderColor:  getColors().basic.black,
    borderWidth:  1,
    borderRadius: PADDING,
    padding: PADDING,
};