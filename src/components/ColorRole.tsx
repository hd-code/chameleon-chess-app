import React from "react";
import { View, ViewStyle } from "react-native";
import { EColor, ERole } from "chameleon-chess-logic";
import { Colors, Images } from "../assets";
import Image from "./Image";
import Overlay, { OverlayType } from "./Overlay";

interface ColorRoleProps {
    fieldColor: EColor
    role: ERole
    active: boolean
}

const style: ViewStyle = {
    height:'50%',
    width: '50%',
}

const images = {
    [ERole.KNIGHT]: Images.Knight,
    [ERole.QUEEN]:  Images.Queen,
    [ERole.BISHOP]: Images.Bishop,
    [ERole.ROOK]:   Images.Rook,
}

const ColorRole = (props: ColorRoleProps) => (
    <View style={{...style, backgroundColor: Colors.main[props.fieldColor]}}>
        <Image source={images[props.role]} />
        {props.active && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
)

export default ColorRole;