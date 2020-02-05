import React from "react";
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native";

import { getBaseFontSize } from '../../helper';

import Overlay, { OverlayType } from "./Overlay";
import Text from './Text';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

interface ButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;
    // fullWidth?: boolean;
}

const Button = (props: ButtonProps) => (
    <TouchableOpacity
        onPress={ !props.disabled ? props.onPress : () => {} }
        activeOpacity={ !props.disabled ? .9 : 1 }
        style={BOX_STYLE}
    >
        <Text style={TEXT_STYLE}>{props.text}</Text>
        {props.disabled && <Overlay type={OverlayType.GREY_OUT} />}
    </TouchableOpacity>
);

export default Button;

// -----------------------------------------------------------------------------

const PADDING = getBaseFontSize() * .8;

const BOX_STYLE: ViewStyle = {
    backgroundColor: getColors().button.background,
    borderColor:     getColors().button.text,
    borderWidth:  1,
    borderRadius: PADDING,
    padding: PADDING,
};

const TEXT_STYLE: TextStyle = {
    color: getColors().button.text,
    fontWeight: '700',
    textAlign: 'center',
};