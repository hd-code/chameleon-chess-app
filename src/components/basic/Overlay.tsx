import React from "react";
import { View, ViewStyle } from "react-native";

import { Colors } from '../../Assets';

// -----------------------------------------------------------------------------

export enum OverlayType { DARKEN, LIGHTEN, GREY_OUT }

interface OverlayProps {
    type: OverlayType;
}

const Overlay = (props: OverlayProps) => (
    <View style={[style, {backgroundColor: COLORS[props.type]}]} />
);

export default Overlay;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
};

const COLORS = {
    [OverlayType.DARKEN]:  Colors.shader.darken,
    [OverlayType.LIGHTEN]: Colors.shader.lighten,
    [OverlayType.GREY_OUT]: Colors.shader.greyOut,
};