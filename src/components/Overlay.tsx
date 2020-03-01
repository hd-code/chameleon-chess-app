import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

import { getColors } from '../assets';

// -----------------------------------------------------------------------------

/** The available overlay types. They effect the color of an overlay. */
export enum EOverlayType { DARKEN, GREYING, LIGHTEN }

interface OverlayProps extends ViewProps {
    type: EOverlayType;
    // children can always be passed, this declaration is just there to satisfy
    // typescript ;-)
    children?: any;
}

/** This component completely covers its parent element. It has a 
 * semi-transparent background. Depending on the overlay type it will darken,
 * grey out or lighten its parent.
 * 
 * The overlay is a react-native View component. Therefore, all react-native
 * View Properties can be used to further style this component. Therefore, it is
 * also possible to add children to an overlay.*/
const Overlay = (props: OverlayProps) => {
    const { style, ...restProps } = props;
    return <View style={[StyleSheet.absoluteFill, STYLES[props.type], style]} {...restProps}/>;
}

export default Overlay;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    [EOverlayType.DARKEN]: {
        backgroundColor: getColors().shader.darken,
    },
    [EOverlayType.GREYING]: {
        backgroundColor: getColors().shader.greying,
    },
    [EOverlayType.LIGHTEN]: {
        backgroundColor: getColors().shader.lighten,
    },
});