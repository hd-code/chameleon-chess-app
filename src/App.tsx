// initialize cache, has to be done first!
import { initCache } from "./storage";
initCache()

import React, { useState } from "react";
import { View, ViewStyle, StatusBar } from "react-native";

import Game from "./views/Game";
import Home from "./views/Home";
import PlayerConfig from "./views/PlayerConfig";

import TopBar from "./components/TopBar";

import { EViews, IViews } from "./navigation";

/* -------------------------------- App.tsx --------------------------------- */

const App = () => {
    const [view, setView] = useState(EViews.HOME)
    const nav: IViews = {
        home: () => { setView(EViews.HOME) },
        game: () => { setView(EViews.GAME) },
        playerConfig: () => { setView(EViews.PLAYER_CONFIG) },
    }

    return (
        <View style={style}>
            <StatusBar hidden={true} />
            <TopBar navigate={nav} />
            <View style={mainAreaStyle}>
                <View style={wrapper}>
                    {view === EViews.HOME && <Home navigate={nav} />}
                    {view === EViews.PLAYER_CONFIG && <PlayerConfig navigate={nav} />}
                    {view === EViews.GAME && <Game navigate={nav} />}
                </View>
            </View>
        </View>
    )
}

export default App;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    backgroundColor: '#efe',
    height: '100%',
    width:  '100%',
}

const mainAreaStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

const wrapper: ViewStyle = {
    width: '95%',
}