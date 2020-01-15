import React from "react";
import { View, ViewStyle, Dimensions } from "react-native";

import Popup from "./Popup";
import Text from "./Text";

import { Colors } from "../assets";
import { EColor } from "chameleon-chess-logic";
import Button from "./Button";

/* ------------------------------- Component -------------------------------- */

interface VictoryPopupProps {
    player: EColor
    style?: ViewStyle
}

const VictoryPopup = (props: VictoryPopupProps) => (
    <Popup style={{
        borderWidth: 20,
        borderColor: Colors.main[props.player]
    }}>
        <View>
            <Text style={{color: Colors.main[props.player]}}>Test</Text>
            <Button text={'Home'} onPress={() => {}} />
            <Button text={'New Game'} onPress={() => {}} />
            <Button text={'Restart Game'} onPress={() => {}} />
        </View>
    </Popup>
)

export default VictoryPopup;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    // alignItems: 'center',
    // backgroundColor: Colors.shader.darken,
    // justifyContent: 'center',
    // position: 'absolute',
    // top: -100, bottom: -100,
    // left: -100, right: -100,
    // zIndex: 2
}

/* --------------------------------- Assets --------------------------------- */