import React from "react";
import { View, ViewStyle } from "react-native";
import PlayerCard, { PlayerCardProps } from "../components/PlayerCard";
import { EColor } from "chameleon-chess-logic";

const style: ViewStyle = {
    flexWrap: 'wrap',
    flexDirection:'row'
}

export interface PlayerBoardProps {
    players: {[player in EColor]: PlayerCardProps}
}

const PlayerBoard = (props: PlayerBoardProps) => (
    <View style={style}>
        <PlayerCard {...props.players[EColor.RED]} />
        <PlayerCard {...props.players[EColor.GREEN]} />
        <PlayerCard {...props.players[EColor.YELLOW]} />
        <PlayerCard {...props.players[EColor.BLUE]} />
    </View>
)

export default PlayerBoard;