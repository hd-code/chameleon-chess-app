import React from "react";
import { View, ViewStyle, Text } from "react-native";

import Image from "./Image";
import TouchableIcon from "./TouchableIcon";

import { Images } from "../assets";
import { ViewProps } from "../navigation";

/* ------------------------------- Component -------------------------------- */

export enum TileStatus { DEACTIVATED, NORMAL, MARKED }

export interface TopBarProps extends ViewProps {}

const TopBar = (props: TopBarProps) => (
    <View style={style}>
        <View style={columnStyle}>
            <TouchableIcon
                onPress={() => {props.navigate.home()}}
                source={Images.Home}
            />
        </View>
        <View style={logoColumnStyle}>
            <Image source={Images.Logo} />
        </View>
        <View style={columnStyle}>
            <Text>Deutsch</Text>
        </View>
    </View>
)

export default TopBar;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    height: '7%',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center'
}

const columnStyle: ViewStyle = {
    height: '100%',
    width:   '20%',
}

const logoColumnStyle: ViewStyle = {
    height: '100%',
    width:   '60%',
}

/* --------------------------------- Assets --------------------------------- */