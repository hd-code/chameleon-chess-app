import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

import Player, { PlayerProps } from "../components/Player";

import { EColor } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

interface PlayerPickerProps extends PlayerProps {
    onPress: (player: EColor) => void
    wrapperStyle: ViewStyle
}

const PlayerPicker = (props: PlayerPickerProps) => (
    <TouchableOpacity
        onPress={ () => props.onPress(props.player) }
        style={ props.wrapperStyle }
        activeOpacity={.8}
    >
        <Player {...props} />
    </TouchableOpacity>
)

export default PlayerPicker;

/* --------------------------------- Styles --------------------------------- */
/* --------------------------------- Assets --------------------------------- */