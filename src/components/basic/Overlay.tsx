import React from "react";
import { View } from "react-native";

import { Styles } from '../../helper';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum OverlayType { DARKEN, LIGHTEN, GREY_OUT }

interface OverlayProps {
    type: OverlayType;
}

const Overlay = (props: OverlayProps) => (
    <View style={[Styles.coverParent, {backgroundColor: COLORS[props.type]}]} />
);

export default Overlay;

// -----------------------------------------------------------------------------

const COLORS = {
    [OverlayType.DARKEN]:   getColors().shader.darken,
    [OverlayType.LIGHTEN]:  getColors().shader.lighten,
    [OverlayType.GREY_OUT]: getColors().shader.greyOut,
};