import React from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';

import { getColors } from '../assets';
import { getBaseFontSize } from '../helper';

import Overlay, { EOverlayType } from './Overlay';
import Text from './Text';

// -----------------------------------------------------------------------------

interface ButtonProps {
    /** Button text */
    children: string;
    /** A Function to be called when button is clicked. */
    onPress: (event: GestureResponderEvent) => void;
    /** Specify the button color as hex string or rgba value. */
    color?: string;
    /** Set to true to disable the button. It can no longer be clicked and is
     * greyed out. */
    disabled?: boolean;
}

/** Basic button element. Use this component instead of the react-native Button.
 * It adheres to the styling of this app and looks identical on all platforms
 * (which is not the case for the react-native Button component).
 * 
 * The button will always fill completely the width of its parent element. */
const Button = (props: ButtonProps) => {
    const style = [STYLES.body, props.color ? {backgroundColor: props.color} : {}];
    const opacity = props.disabled ? 1 : .9;
    const onPress = props.disabled ? () => {} : props.onPress;

    return <TouchableOpacity style={style} onPress={onPress} activeOpacity={opacity}>
        <Text style={STYLES.text} invert={true}>{props.children}</Text>
        {props.disabled && <Overlay type={EOverlayType.GREYING} style={STYLES.overlay}/>}
    </TouchableOpacity>;
};

export default Button;

// -----------------------------------------------------------------------------

const PADDING = getBaseFontSize() * .7;

const STYLES = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: getColors().main[1],
        borderColor: getColors().basic.black,
        borderRadius: PADDING,
        borderWidth: StyleSheet.hairlineWidth,
        padding: PADDING,
        width: '100%',
    },
    overlay: {
        borderRadius: PADDING,
    }
});