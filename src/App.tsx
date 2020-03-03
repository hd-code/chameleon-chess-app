import React, { useState }from 'react';
import { ImageBackground, LayoutAnimation, SafeAreaView, StatusBar, View,
        ViewStyle, Platform, UIManager } from 'react-native';

import { getImages } from './assets';

import Game from './components/Game';
import GameConfig from './components/GameConfig';
import Home from './components/Home';
import Settings from './components/Settings';
import Topbar from './components/Topbar';

import { getGame, onBeginGame, onGameRender, onPressBoard } from './controller/game';
import { getSettings, getSettingsChanger } from './controller/settings';
import { getNavigation, getView } from './controller/view';

import { IGameExt } from './models/game';
import { EView, INavigation } from './models/view';

// -----------------------------------------------------------------------------

/** Root component of the whole app. */
const App = () => {
    // trigger a re-render when the `onStateChange` function is called.
    const [render, setRender] = useState(false);
    function reRender() { setRender(!render); }
    stateChangeFunc = reRender;
    
    // make transitions between renderings smooth, so that they 'fade' into each other.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    const view = getView();
    const navigation = getNavigation();

    return <ImageBackground
        source={getImages().background}
        style={{height: '100%', width: '100%'}}
    >
        <StatusBar hidden={true} />

        <SafeAreaView style={{height: '100%', width: '100%'}}>
            <View style={mainStyle}>
                {/* Do not display topbar on home view. */}
                {view !== EView.HOME ? <Topbar navigation={navigation} /> : <View />}

                {displayView(view, navigation)}

                <View />{/* Potenzieller Footer */}
            </View>
        </SafeAreaView>
    </ImageBackground>;
};

export default App;

/** Call this function to notify the App.tsx component that the app state has
 * changed. The App.tsx component will then re-render. */
export function onStateChange() {
    stateChangeFunc();
}

// -----------------------------------------------------------------------------

const mainStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
}

/** Variable to store the re-render function from the component. Otherwise that
 * function would not be available on this level of the program. */
let stateChangeFunc = () => {};

/** This variable has no direct purpose. It is just used to prevent the
 * typescript compiler from displaying an error, that is actually no error at
 * all. */
let t: IGameExt;

function displayView(view: EView, navigation: INavigation) {
    switch (view) {
        case EView.HOME:
            return <Home game={getGame()} navigation={navigation} />

        case EView.GAME:
            const {players, ...game} = getGame() || t;
            if (!game) {
                console.warn('App.tsx: No game available.');
                return <Home game={null} navigation={navigation} />
            }
            return <Game game={game} players={players} navigation={navigation}
                onGameRender={onGameRender}
                onPressBoard={onPressBoard}
            />;

        case EView.GAME_CONFIG:
            return <GameConfig navigation={navigation} onBeginGame={onBeginGame} />

        case EView.SETTINGS:
            return <Settings settings={getSettings()} changeSettings={getSettingsChanger()} />
    }
}

// -----------------------------------------------------------------------------

// for android devices LayoutAnimation has to be turned on manually
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}