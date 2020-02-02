import React from "react";
import { View, ViewStyle } from "react-native";

import { EColor, ERole } from 'chameleon-chess-logic';

import Image from '../basic/Image';
import Overlay, { OverlayType } from '../basic/Overlay';

import { getColors } from '../../models/Colors';
import { getImages } from '../../models/Images';

// -----------------------------------------------------------------------------

interface ColorRoleProps {
    fieldColor: EColor;
    role: ERole;
    active: boolean;
}

const ColorRole = (props: ColorRoleProps) => (
    <View style={[ style, { backgroundColor: getColors().main[props.fieldColor] } ]}>
        <Image source={images[props.role]} />
        {props.active && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
);

export default ColorRole;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height:'50%',
    width: '50%',
};

const images = {
    [ERole.KNIGHT]: getImages().Knight,
    [ERole.QUEEN]:  getImages().Queen,
    [ERole.BISHOP]: getImages().Bishop,
    [ERole.ROOK]:   getImages().Rook,
};