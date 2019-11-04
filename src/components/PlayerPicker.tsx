import React from "react";
import { TouchableOpacity } from "react-native";
import Player from "../components/Player";
import { EPlayerType } from "../aux/game";
import { EColor } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

interface PlayerPickerProps {
    player: EColor
    type: EPlayerType
    onPress: (player: EColor) => void
}

const PlayerPicker = (props: PlayerPickerProps) => (
    <TouchableOpacity onPress={ () => { props.onPress(props.player) } } activeOpacity={.8}>
        <Player player={props.player} type={props.type} />
    </TouchableOpacity>
)

export default PlayerPicker;

/* --------------------------------- Styles --------------------------------- */
/* --------------------------------- Assets --------------------------------- */