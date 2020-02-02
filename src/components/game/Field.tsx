import React from "react";
import { View, ViewStyle } from "react-native";

import { EColor } from 'chameleon-chess-logic';

import { Colors } from '../../Assets';

import Overlay from '../basic/Overlay';

// -----------------------------------------------------------------------------

export enum FieldStatus { DEACTIVATED, NORMAL, MARKED }

export interface FieldProps {
    key: string;
    color: EColor;
    status: FieldStatus;
}

const Field = (props: FieldProps) => (
    <View style={[ style, { backgroundColor: Colors.main[props.color] } ]}>
        { props.status === FieldStatus.DEACTIVATED && <Overlay type={0} /> }
        { props.status === FieldStatus.MARKED      && <Overlay type={1} /> }
    </View>
)

export default Field;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height:'12.5%',
    width: '12.5%',
    borderWidth: 1,
}