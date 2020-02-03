import React, { useState } from "react";
import { View, ViewStyle, StatusBar } from "react-native";

import AppState from './AppState';

import Game from './components/Game';
import Home from './components/Home';
import PlayerConfig from './components/PlayerConfig';
import TopBar from './components/TopBar';

import { getColors } from './models/Colors';
import { EView } from './models/View';

// -----------------------------------------------------------------------------

// TODO: JSDoc überall hin

export interface IAppController {
    goTo: {
        Game: () => void;
        Home: () => void;
        PlayerConfig: () => void;
    };
    reRender: () => void;
}

const App = () => {
    const [renderTrigger, setRenderTrigger] = useState(false);
    const render = () => setRenderTrigger(!renderTrigger);
    
    const controller: IAppController = {
        goTo: {
            Game: () => {
                AppState.View.set(EView.GAME);
                render();
            },
            Home: () => {
                AppState.View.set(EView.HOME);
                render();
            },
            PlayerConfig: () => {
                AppState.View.set(EView.PLAYER_CONFIG);
                render();
            },
        },
        reRender: render
    };

    return (
        <View style={appStyle}>
            <StatusBar hidden={true} />
            <TopBar controller={controller} />

            {AppState.View.get() === EView.GAME && <Game controller={controller} />}
            {AppState.View.get() === EView.HOME && <Home controller={controller} />}
            {AppState.View.get() === EView.PLAYER_CONFIG && <PlayerConfig controller={controller} />}

            <View />{/* Placeholder for a potential Footer */}
        </View>
    );
}

export default App;

// -----------------------------------------------------------------------------

const appStyle: ViewStyle = {
    backgroundColor: getColors().basic.background,
    height: '100%',
    width:  '100%',
    flex: 1,
    justifyContent: 'space-between',
};