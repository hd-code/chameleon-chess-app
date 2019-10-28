import React from "react";
import { View, ViewStyle } from "react-native";
import { EColor } from "chameleon-chess-logic";
import { Colors } from "../assets";
import Overlay from "./Overlay";

const style: ViewStyle = {
    height:'12.5%',
    width: '12.5%',
    borderWidth: 1,
}

export enum TileStatus { DEACTIVATED, NORMAL, MARKED }

export interface TileProps {
    color: EColor
    status: TileStatus
}

const Tile = (props: TileProps) => (
    <View style={{...style, backgroundColor: Colors.main[props.color]}}>
        {
            props.status === TileStatus.DEACTIVATED &&
                <Overlay type={0} /> ||
            props.status === TileStatus.MARKED &&
                <Overlay type={1} />
        }
    </View>
)

export default Tile;