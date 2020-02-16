import React from 'react';
import { View } from 'react-native';

import { getBaseFontSize } from '../../models/Device';

// -----------------------------------------------------------------------------

interface SpacerProps {
    scale?: number;
}

const Spacer = (props: SpacerProps) => {
    const scale = props.scale || 1;
    return (
        <View style={{height: DEFAULT_SIZE * scale, width: DEFAULT_SIZE * scale}} />
    );
}

export default Spacer;

// -----------------------------------------------------------------------------

const DEFAULT_SIZE = getBaseFontSize();