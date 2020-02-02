import React from "react";
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native";

import Overlay, { OverlayType } from "./Overlay";
import Text from './Text';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

interface ButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => (
    <TouchableOpacity
        onPress={ !props.disabled ? props.onPress : () => {} }
        activeOpacity={ !props.disabled ? .9 : 1 }
        style={style}
    >
        <Text style={textStyle}>{props.text}</Text>
        {props.disabled && <Overlay type={OverlayType.GREY_OUT} />}
    </TouchableOpacity>
);

export default Button;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    backgroundColor: getColors().button.background,
    borderColor:     getColors().button.text,
    borderRadius: 10,
    borderWidth:   1,
    padding: 20,
    width: '100%',
};

const textStyle: TextStyle = {
    color: getColors().button.text,
    fontWeight: '700',
    textAlign: 'center'
};