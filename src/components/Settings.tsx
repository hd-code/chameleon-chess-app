import React, { useState } from 'react';
import { View, StyleSheet, Switch, Picker, Platform, UIManager } from 'react-native';

import { getColors, getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Button from './Button';
import Popup from './Popup';
import Spacer from './Spacer';
import Text from './Text';
import Topbar from './Topbar';

import * as app from '../controller/app';

import { getLanguageDescriptions, ELanguage } from '../models/language';

// -----------------------------------------------------------------------------

/** The root component for the home view. This is the start screen of the app. */
const Settings = () => {
    const [showLangPicker, setShowLangPicker] = useState(false);
    function toggleLanguagePicker() {
        setShowLangPicker(!showLangPicker);
    }

    return <>
        <Topbar />

        <View style={STYLES.wrapper}>
            <Text invert={true} scale={2.5}>{getTexts().settings.heading}</Text>

            <Spacer />

            <View style={STYLES.line}>
                <Text invert={true} scale={1.5}>{getTexts().settings.sounds}</Text>
                {getSwitch(app.isSoundOn(), app.toggleSoundOn)}
            </View>

            <Spacer />

            <View style={STYLES.line}>
                <Text invert={true} scale={1.5}>{getTexts().settings.music}</Text>
                {getSwitch(app.isMusicOn(), app.toggleMusicOn)}
            </View>
            
            <Spacer />
        
            <View style={STYLES.line}>
                <Text invert={true} scale={1.5}>{getTexts().settings.language}</Text>
                <View>
                    <Button onPress={toggleLanguagePicker}>
                        {getLanguageDescriptions()[app.getLanguage()]}
                    </Button>
                </View>
            </View>
        </View>

        <View />

        {showLangPicker && getLanguagePopup(toggleLanguagePicker)}
        {fixAndroidBug()}
    </>;
}

export default Settings;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        maxWidth: '100%',
        width: getBaseFontSize() * 20,
    },
    line: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    picker: {
        backgroundColor: getColors().basic.white,
        justifyContent: 'center',
        overflow: 'hidden',
        height: getBaseFontSize() * 4,
        width: '100%',
    },
});

function getSwitch(value: boolean, onValueChange: (value: boolean) => void) {
    return <Switch value={value} onValueChange={onValueChange}
        trackColor={{false: getColors().shader.darken, true: getColors().main[1]}}
        thumbColor={getColors().basic.white}
    />
}

function getLanguagePopup(togglePopup: () => void) {
    return <Popup style={{width: 200}}>
        <Text invert={true} scale={1.5} onPress={togglePopup} style={{fontWeight: 'bold'}}>
            X
        </Text>

        <Spacer scale={.5} />

        <Picker
            onValueChange={(lang) => {app.setLanguage(lang)}}
            selectedValue={app.getLanguage()}
            style={STYLES.picker} mode={'dropdown'}
        >
            {getLanguageItems()}
        </Picker>
    </Popup>;
}

function getLanguageItems() {
    const langDescriptions = getLanguageDescriptions();
    const keys = Object.keys(langDescriptions);

    return keys.map(key =>
        <Picker.Item label={langDescriptions[key as ELanguage]} value={key} key={key} />
    );
}

// FIXME: Android Layout Animation Bug
// There is a bug in the LayoutAnimation on Android, throwing an exception whenever
// you try to load a somewhat similar view with a similar layout and flex activated.
// The bug will be reported to facebook. This is a work around. Search the project
// for the fixme statement to find all places where the work around had to be applied.
function fixAndroidBug() {
    // reactivate layout animation after this component loaded successfully.
    setTimeout(reactivateLayoutAnimation, 1000);
}

function reactivateLayoutAnimation() {
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
}
// -----------------------------------