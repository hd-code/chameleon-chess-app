import React from "react";
import { View, ViewStyle } from "react-native";

import { EColor, ERole } from 'chameleon-chess-logic';

import Image from '../basic/Image';

import { getColors } from '../../models/Colors';
import { getImages } from '../../models/Images';

// -----------------------------------------------------------------------------

interface ColorRoleProps {
    fieldColor: EColor;
    role: ERole;
    active: boolean;
}

const ColorRole = (props: ColorRoleProps) => (
    <View 
        style={[
            STYLE, { backgroundColor: getColors().main[props.fieldColor] },
            props.active && {borderWidth: 1}
        ]}
    >
        <Image source={IMAGES[props.role]} />
    </View>
);

export default ColorRole;

// -----------------------------------------------------------------------------

const STYLE: ViewStyle = {
    borderColor: getColors().basic.white,
    height:'50%',
    width: '50%',
};

const IMAGES = {
    [ERole.KNIGHT]: getImages().Knight,
    [ERole.QUEEN]:  getImages().Queen,
    [ERole.BISHOP]: getImages().Bishop,
    [ERole.ROOK]:   getImages().Rook,
};