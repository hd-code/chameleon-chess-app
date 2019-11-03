import React from "react";
import { View, ViewStyle, ImageStyle } from "react-native";
import { EColor } from "chameleon-chess-logic";
import { Colors, Images, Texts } from "../assets";
import { EPlayerType } from "../aux/game";
import Image from "./Image";
import Overlay, { OverlayType } from "./Overlay";
import Text from "./Text";

const style: ViewStyle = {
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: '2%',
    paddingBottom: '2%',
    width: '25%',
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

export enum PlayerStatus { DEAD, ON_TURN, OFF_TURN }

const icons = {
    [EPlayerType.NONE]:  Images.NoPlayer,
    [EPlayerType.HUMAN]: Images.Human,
    [EPlayerType.AI]:    Images.AI,
}

const names = Texts.players

export interface PlayerProps {
    player: EColor
    status: PlayerStatus
    type: EPlayerType
}

const Player = (props: PlayerProps) => (
    <View style={{...style, backgroundColor: Colors.main[props.player]}}>
        <Text style={{textAlign: 'center'}}>{names[props.player]}</Text>
        <View style={styleImgWrapper}>
            <Image source={icons[props.type]} style={styleImg} />
        </View>
        {(props.type === EPlayerType.NONE || props.status === PlayerStatus.DEAD) 
            && <Overlay type={OverlayType.DARKEN} />}
        {props.status === PlayerStatus.ON_TURN && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
)

export default Player;