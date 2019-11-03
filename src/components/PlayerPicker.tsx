import React from "react";
import { View, ViewStyle } from "react-native";
import { EColor } from "chameleon-chess-logic";

const style: ViewStyle = {
    borderWidth: 1,
    height: 50,
    width: '48%',
}

interface PlayerPickerProps {
    player: EColor
}

const PlayerPicker = (props: PlayerPickerProps) => (
    <View style={style} />
)

export default PlayerPicker;