import React from 'react';
import { View } from 'react-native';

import { getBaseFontSize } from '../../helper';

// -----------------------------------------------------------------------------

interface SpacerProps {
    scale?: number;
}

const Spacer = (props: SpacerProps) => (
    <View style={{height: DEFAULT_HEIGHT * (props.scale || 1)}} />
);

export default Spacer;

// -----------------------------------------------------------------------------

const DEFAULT_HEIGHT = getBaseFontSize();