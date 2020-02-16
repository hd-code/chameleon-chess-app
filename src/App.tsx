import React, { useState } from 'react';
import { View, ViewStyle, StatusBar, ImageBackground } from 'react-native';

import AppState from './AppState';

import Game from './components/Game';
import Home from './components/Home';
import PlayerConfig from './components/PlayerConfig';

import { IGame } from './models/Game';
import { getImages } from './models/Images';
import { EView } from './models/View';

// -----------------------------------------------------------------------------

const App = () => {
    const [render, setRender] = useState(true);
    AppState.subscribeOnce(() => setRender(!render));

    return (
        <ImageBackground source={getImages().BackgroundImage} style={APP_STYLE}>
            <StatusBar hidden={true} />
            
            <View style={{maxWidth: '98%'}}>
                {/* {renderView()} */}
            </View>
        </ImageBackground>
    );
}

export default App;

// -----------------------------------------------------------------------------

const APP_STYLE: ViewStyle = {
    backgroundColor: '#c4e9b4',
    height: '100%',
    width:  '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
};

let t: IGame;

// function renderView() {
//     const view = AppState.View.get();
//     const language = AppState.Settings.Language.get();

//     switch (view) {
//         case EView.HOME:
//             return <Home language={language} />;
//         case EView.PLAYER_CONFIG:
//             return <PlayerConfig language={language} />;
//         case EView.GAME:
//             return <Game gameData={AppState.Game.get() || t} />;
//     }
// }