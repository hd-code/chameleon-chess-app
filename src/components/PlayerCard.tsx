import React from "react";
import { View, ViewStyle, Text, ImageStyle } from "react-native";
import { EColor } from "chameleon-chess-logic";
import { Colors, Images } from "../assets";
import Image from "./Image";
import Overlay, { OverlayType } from "./Overlay";

const style: ViewStyle = {
    alignItems: 'center',
    paddingTop: '2%',
    paddingBottom: '2%',
    width: '25%',
}

const styleImgWrapper: ViewStyle = {
    width: '40%',
    paddingBottom: '40%',
}

const styleImg: ImageStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}

export enum PlayerStatus { DEAD, ON_TURN, OFF_TURN }
export enum PlayerType   { NONE, HUMAN, AI }

const icons = {
    [PlayerType.NONE]:  Images.NoPlayer,
    [PlayerType.HUMAN]: Images.Human,
    [PlayerType.AI]:    Images.AI,
}

export interface PlayerCardProps {
    player: EColor
    name: string
    status: PlayerStatus
    type: PlayerType
}

const PlayerCard = (props: PlayerCardProps) => (
    <View style={{...style, backgroundColor: Colors.main[props.player]}}>
        <Text>{props.name}</Text>
        <View style={styleImgWrapper}>
            <Image source={icons[props.type]} style={styleImg} />
        </View>
        {(props.type === PlayerType.NONE || props.status === PlayerStatus.DEAD) 
            && <Overlay type={OverlayType.DARKEN} />}
        {props.status === PlayerStatus.ON_TURN && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
)

export default PlayerCard;