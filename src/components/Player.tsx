import React from "react";
import { View, ViewStyle, ImageStyle } from "react-native";

import Image from "./Image";
import Overlay, { OverlayType } from "./Overlay";
import Text from "./Text";

import { Colors, Images, Texts } from "../assets";
import { EPlayerType } from "../types";

import { EColor } from "chameleon-chess-logic";

/* ------------------------------- Component -------------------------------- */

export enum PlayerStatus { DEAD, ON_TURN, OFF_TURN }

export interface PlayerProps {
    player: EColor
    type: EPlayerType
    status?: PlayerStatus
    style?: ViewStyle
}

const Player = (props: PlayerProps) => (
    <View style={[style, {backgroundColor: Colors.main[props.player]}, props.style]}>
        <Text style={{textAlign: 'center'}}>{names[props.player]}</Text>
        <View style={styleImgWrapper}>
            <Image source={icons[props.type]} style={styleImg} />
        </View>
        {props.status === PlayerStatus.DEAD && <Overlay type={OverlayType.DARKEN} />}
        {props.status === PlayerStatus.OFF_TURN && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
)

export default Player;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    alignItems: 'center',
    borderWidth: 1,
    padding: '2%',
}

const styleImgWrapper: ViewStyle = {
    width: '30%',
    paddingBottom: '30%',
}

const styleImg: ImageStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
}

/* --------------------------------- Assets --------------------------------- */

const icons = {
    [EPlayerType.NONE]:  Images.NoPlayer,
    [EPlayerType.HUMAN]: Images.Human,
    [EPlayerType.AI]:    Images.AI,
}

const names = Texts.players