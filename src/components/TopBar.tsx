import React from 'react';
import { View, ViewStyle } from 'react-native';

import { IAppController } from '../App';
import { getBaseFontSize, Styles } from '../helper';

import Image from './basic/Image';

import { getImages } from '../models/Images';

// -----------------------------------------------------------------------------

// TODO: Bessere Grafik für Home, was kommt rechts hin?

export interface TopBarProps {
    controller: IAppController;
}

const TopBar = (props: TopBarProps) => (
    <View style={[Styles.flexJustify, {height: HEIGHT}, {borderBottomWidth: 1}]}>
        <View style={{height: HEIGHT, width: HEIGHT}}>
            <Image source={getImages().Home} onPress={props.controller.goTo.Home} />
        </View>

        <View style={{height: HEIGHT, width: HEIGHT * 2.5}}>
            <Image source={getImages().Logo} />
        </View>

        <View style={{height: HEIGHT, width: HEIGHT}}>
            <Image source={getImages().Settings} onPress={props.controller.toggleSettings} />
        </View>
    </View>
);

export default TopBar;

// -----------------------------------------------------------------------------

const HEIGHT = getBaseFontSize() * 4;