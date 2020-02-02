import React from "react";
import { View, ViewStyle } from "react-native";

import { EColor, ERole } from 'chameleon-chess-logic';

import { Colors, Images } from '../../Assets';

import Image from '../basic/Image';
import Overlay, { OverlayType } from '../basic/Overlay';


// -----------------------------------------------------------------------------

interface ColorRoleProps {
    fieldColor: EColor;
    role: ERole;
    active: boolean;
}

const ColorRole = (props: ColorRoleProps) => (
    <View style={[ style, { backgroundColor: Colors.main[props.fieldColor] } ]}>
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
    [ERole.KNIGHT]: Images.Knight,
    [ERole.QUEEN]:  Images.Queen,
    [ERole.BISHOP]: Images.Bishop,
    [ERole.ROOK]:   Images.Rook,
};