import React from "react";
import { View, ViewStyle } from "react-native";

import { IAppController } from '../App';
import { getSmallerDim } from '../helper';

import Image from './basic/Image';

import { getImages } from '../models/Images';

// -----------------------------------------------------------------------------

export interface TopBarProps {
    controller: IAppController;
}

const TopBar = (props: TopBarProps) => (
    <View style={[justify, {height}]}>
        <View style={{height: height, width: height}}>
            <Image source={getImages().Home} onPress={props.controller.goTo.Home} />
        </View>

        <View style={{height, width: height * 2.5}}>
            <Image source={getImages().Logo} />
        </View>

        <View style={{height, width: height}}>
            <Image source={getImages().Home} />
        </View>
    </View>
);

export default TopBar;

// -----------------------------------------------------------------------------

const justify: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between'
};

const DYN_HEIGHT = getSmallerDim() * 0.1;
const MIN_HEIGHT = 50;

const height = Math.max(DYN_HEIGHT, MIN_HEIGHT);