import React from "react";
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native";

import Text from "./Text";
import Overlay, { OverlayType } from "./Overlay";

import { Colors } from "../assets";

/* ------------------------------- Component -------------------------------- */

interface ButtonProps {
    text: string
    onPress: () => void
    disabled?: boolean
}

const Button = (props: ButtonProps) => (
    <TouchableOpacity
        onPress={!props.disabled ? props.onPress : () => {}}
        activeOpacity={!props.disabled ? .9 : 1}
        style={style}
    >
        <Text style={textStyle}>{props.text}</Text>
        {props.disabled && <Overlay type={OverlayType.GREY_OUT} />}
    </TouchableOpacity>
)

export default Button;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    backgroundColor: Colors.button.background,
    borderColor: Colors.button.text,
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    width: '100%',
}

const textStyle: TextStyle = {
    color: Colors.button.text,
    fontWeight: '700',
    textAlign: 'center'
}

/* --------------------------------- Assets --------------------------------- */