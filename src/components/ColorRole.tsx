import React from "react";
import { View, ViewStyle } from "react-native";

import Image from "./Image";
import Overlay, { OverlayType } from "./Overlay";

import { Colors, Images } from "../assets";

import { EColor, ERole } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

interface ColorRoleProps {
    fieldColor: EColor
    role: ERole
    active: boolean
}

const ColorRole = (props: ColorRoleProps) => (
    <View style={{...style, backgroundColor: Colors.main[props.fieldColor]}}>
        <Image source={images[props.role]} />
        {props.active && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
)

export default ColorRole;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    height:'50%',
    width: '50%',
}

/* --------------------------------- Assets --------------------------------- */

const images = {
    [ERole.KNIGHT]: Images.Knight,
    [ERole.QUEEN]:  Images.Queen,
    [ERole.BISHOP]: Images.Bishop,
    [ERole.ROOK]:   Images.Rook,
}