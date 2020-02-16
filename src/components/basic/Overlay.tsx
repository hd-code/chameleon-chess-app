import React from 'react';
import { View } from 'react-native';

import { Styles } from '../../models/Device';

// -----------------------------------------------------------------------------

export enum OverlayType { DARKER, DARKEN, GREY_OUT, LIGHTEN, LIGHTER }

interface OverlayProps {
    type: OverlayType;
    borderRadius?: number
}

const Overlay = (props: OverlayProps) => (
    <View style={[Styles.coverParent, STYLES[props.type], {borderRadius: props.borderRadius}]} />
);

export default Overlay;

// -----------------------------------------------------------------------------

const COLORS = {
    black: '#000',
    grey:  '#888',
    white: '#fff',
}

const STYLES = {
    [OverlayType.DARKER]:   { backgroundColor: COLORS.black, opacity: .75 },
    [OverlayType.DARKEN]:   { backgroundColor: COLORS.black, opacity: .5  },
    [OverlayType.GREY_OUT]: { backgroundColor: COLORS.grey,  opacity: .75 },
    [OverlayType.LIGHTEN]:  { backgroundColor: COLORS.white, opacity: .5  },
    [OverlayType.LIGHTER]:  { backgroundColor: COLORS.white, opacity: .75 },
};