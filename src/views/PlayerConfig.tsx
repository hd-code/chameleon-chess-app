import React from "react";
import { View, ViewStyle } from "react-native";
import PlayerPicker from "../components/PlayerPicker";
import { EColor } from "chameleon-chess-logic";
import Button from "../components/Button";
import { Texts } from "../assets";
import { IViewBaseProps, EViews } from "../App";

const style: ViewStyle = {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
}

interface PlayerConfigProps extends IViewBaseProps {}

// TODO: PlayerPicker
// TODO: const for all colors + set colors -> func
// TODO: initGame
// TODO: check for enough players to start game

const PlayerConfig = (props: PlayerConfigProps) => {

    function beginGame() {
        props.navigate(EViews.GAME)
    }

    return (
        <View style={style}>
            <PlayerPicker player={EColor.RED} />
            <PlayerPicker player={EColor.GREEN} />
            <PlayerPicker player={EColor.YELLOW} />
            <PlayerPicker player={EColor.BLUE} />
            <Button
                text={ Texts.PlayerConfig.beginGame }
                onPress={ beginGame }
            />
        </View>
    )
}

export default PlayerConfig;