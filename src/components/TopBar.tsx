import React from "react";
import { View, ViewStyle, Picker, TextStyle } from "react-native";

import Image from "./Image";
import TouchableIcon from "./TouchableIcon";

import { Images } from "../assets";
import { ViewProps } from "../navigation";
import { Language } from "../storage";
import { ELanguage } from "../types";

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
            <Picker
                selectedValue={Language.get()}
                onValueChange={lang => {
                    Language.set(lang)
                    props.navigate.rerender()
                }}
                style={pickerStyle}
                itemStyle={pickerItemStyle}
            >
                <Picker.Item value={ELanguage.ENGLISH} label={'english'} />
                <Picker.Item value={ELanguage.GERMAN} label={'deutsch'} />
            </Picker>
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

const pickerStyle: ViewStyle = {
    borderWidth: 1,
    height: '100%',
    overflow: 'hidden'
}

const pickerItemStyle: TextStyle = {
    fontSize: 20,
    marginTop: -70
}

/* --------------------------------- Assets --------------------------------- */