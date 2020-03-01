import React, { useState }from 'react';
import { SafeAreaView, StatusBar, ImageBackground, StyleSheet, View, Platform, UIManager, LayoutAnimation } from 'react-native';

import { getImages, getMusicPlayer, music } from './assets';

import Game from './components/Game';
import Home from './components/Home';
import PlayerConfig from './components/PlayerConfig';
import Settings from './components/Settings';

import { subscribe, getView, isMusicOn } from './controller/app';
import { getGame } from './controller/game';

import { EView } from './models/view';

// -----------------------------------------------------------------------------

/** The root component of the whole app. It provides a basic wrapper, where all
 * other components will be displayed inside. This component is alway visible.
 * 
 * It subscribes to changes in the app controller. When the app state changes,
 * this component gets notified and will re-render, causing the whole
 * application view to re-render. */
const App = () => {
    // `render` is a simple boolean variabel. Through `setRender` the variable
    // gets flipped. This flipping causes the app to re-render. Therefore,
    // this flipping function is registered as a callback for changes in the app
    // state. Everytime the app state in the app controller changes, this
    // flipping function gets called and the app views are refreshed.
    const [render, setRender] = useState(false);
    subscribe(() => { setRender(!render); });

    // make all transitions between different renderings smooth
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    console.log(isMusicOn())
    isMusicOn() ? music.play() : music.pause();

    return (
        <ImageBackground source={getImages().background} style={STYLES.background} >
            <StatusBar hidden={true} />

            <SafeAreaView style={STYLES.safeAreaView}>
                <View style={STYLES.main}>
                    {getViewComponent(getView())}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default App;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    background: {
        height: '100%',
        width:  '100%',
    },
    safeAreaView: {
        height: '100%',
        width:  '100%',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width:  '100%',
    },
});

function getViewComponent(view: EView) {
    switch (view) {
        case EView.HOME:
            return <Home />;

        case EView.PLAYER_CONFIG:
            return <PlayerConfig />;

        case EView.GAME:
            const game = getGame();
            if (!game) {
                console.warn('App.tsx: Could not load game view, because there is no saved game.');
                return <Home />;
            }
            return <Game {...game} />;

        case EView.SETTINGS:
            return <Settings />;
    }
}

// -----------------------------------------------------------------------------

// enable LayoutAnimation on Android, this just has to be set once
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}