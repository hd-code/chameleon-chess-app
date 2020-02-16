import React from 'react';
import { View, ViewStyle } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import Overlay, { OverlayType }from '../basic/Overlay';

// import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum FieldStatus { DEACTIVATED, NORMAL, MARKED }

export interface FieldProps {
    key: string;
    color: EColor;
    status: FieldStatus;
}

const Field = (props: FieldProps) => (
    <View style={[ STYLE, { backgroundColor: COLORS[props.color] } ]}>
        { props.status === FieldStatus.DEACTIVATED && <Overlay type={OverlayType.DARKER} /> }
        { props.status === FieldStatus.MARKED      && <Overlay type={OverlayType.LIGHTER} /> }
    </View>
);

export default Field;

// -----------------------------------------------------------------------------

const COLORS: {[color in EColor]: string} = {
    [EColor.RED]:    '#B9542D',
    [EColor.GREEN]:  '#51A230',
    [EColor.YELLOW]: '#DDBB71',
    [EColor.BLUE]:   '#04909D',
}

const STYLE: ViewStyle = {
    height:'12.5%',
    width: '12.5%',
    borderWidth: 1,
};