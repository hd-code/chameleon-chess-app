import React from "react";
import { View, ViewStyle, Dimensions } from "react-native";

import { Colors } from "../assets";

/* ------------------------------- Component -------------------------------- */

interface PopupProps {
    children: JSX.Element|JSX.Element[]
    style?: ViewStyle
}

const Popup = (props: PopupProps) => (
    <View style={style}>
        <View style={[wrapper, props.style]}>
            {props.children}
        </View>
    </View>
)

export default Popup;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    alignItems: 'center',
    backgroundColor: Colors.shader.darken,
    justifyContent: 'center',
    position: 'absolute',
    top: -100, bottom: -100,
    left: -100, right: -100,
    zIndex: 2
}

const wrapper: ViewStyle = {
    backgroundColor: Colors.basic.background,
    maxWidth: Dimensions.get('window').width - 20,
    padding: 20,
}

/* --------------------------------- Assets --------------------------------- */