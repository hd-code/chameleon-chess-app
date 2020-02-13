import React, { useState } from 'react';
import { View, ViewStyle, StatusBar, Picker } from 'react-native';

import { IAppController } from '../App';
import AppState from '../AppState';
import { getBaseFontSize, getScreenDim } from '../helper';

import Spacer from './basic/Spacer';
import Text, { ETextType } from './basic/Text';

import { ELanguage, getTexts } from '../models/Texts';

// -----------------------------------------------------------------------------

export interface SettingsProps {
    controller: IAppController;
}

const Settings = (props: SettingsProps) =>
<View style={{width: getScreenDim().width * .7}}>
    <Text type={ETextType.HEADING}>{ getTexts().Settings.heading }</Text>
    <Spacer />
    <Text>{ getTexts().Settings.language }</Text>
    <Picker
        selectedValue={AppState.Settings.Language.get()}
        style={PICKER_STYLE}
        onValueChange={lang => { AppState.Settings.Language.set(lang); props.controller.reRender() }}
        itemStyle={{fontSize: getBaseFontSize() * .9}}
    >
        <Picker.Item label='deutsch' value={ELanguage.GERMAN} />
        <Picker.Item label='english' value={ELanguage.ENGLISH} />
    </Picker>
</View>;

export default Settings;

// -----------------------------------------------------------------------------

const PICKER_STYLE: ViewStyle = {
    borderWidth: 1,
    height: getBaseFontSize() * 3,
    justifyContent: 'center',
    overflow: 'hidden',
    // width: 500,
}