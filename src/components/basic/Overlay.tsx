import React from 'react';
import { View } from 'react-native';

import { Styles, getBaseFontSize } from '../../helper';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum OverlayType { DARKER, DARK, GREY_OUT, LIGHT, LIGHTER, WHITE_FRAME}

interface OverlayProps {
    type: OverlayType;
}

const Overlay = (props: OverlayProps) => (
    <View style={[Styles.coverParent, STYLES[props.type]]} />
);

export default Overlay;

// -----------------------------------------------------------------------------

const STYLES = {
    [OverlayType.DARKER]:   { backgroundColor: getColors().shader.darker },
    [OverlayType.DARK]:     { backgroundColor: getColors().shader.dark },
    [OverlayType.GREY_OUT]: { backgroundColor: getColors().shader.greyOut },
    [OverlayType.LIGHT]:    { backgroundColor: getColors().shader.light },
    [OverlayType.LIGHTER]:  { backgroundColor: getColors().shader.lighter },
    [OverlayType.WHITE_FRAME]: { 
        borderColor: getColors().shader.lighter,
        borderWidth: getBaseFontSize() * .4,
    },
};