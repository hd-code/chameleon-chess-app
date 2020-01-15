import React, { useState } from "react";
import { View, ViewStyle, TextStyle, StatusBar, Picker } from "react-native";

import Game from "./views/Game";
import Home from "./views/Home";
import PlayerConfig from "./views/PlayerConfig";

import TopBar from "./components/TopBar";
import Popup from "./components/Popup";
import Text from "./components/Text";

import { Colors } from "./assets";
import { EViews, INavs } from "./navigation";
import { initCache, Language } from "./storage";
import { ELanguage } from "./types";
import VictoryPopup from "./components/VictoryPopup";
import { EColor } from "chameleon-chess-logic";

/* -------------------------------- App.tsx --------------------------------- */

const App = () => {
    const [cacheLoaded, setCacheLoaded] = useState(false)
    !cacheLoaded && initCache()
    .then(() => {
        setCacheLoaded(true)
    }).catch( e => console.error(e) )

    const [render, setRender] = useState(false)
    const [view, setView] = useState(EViews.HOME)
    const nav: INavs = {
        home: () => { setView(EViews.HOME) },
        game: () => { setView(EViews.GAME) },
        playerConfig: () => { setView(EViews.PLAYER_CONFIG) },
        rerender: () => { setRender(!render) }
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
            {/* <VictoryPopup player={EColor.RED} /> */}
            {/* <Popup>
                <Picker
                    selectedValue={Language.get()}
                    onValueChange={lang => {
                        Language.set(lang)
                        nav.rerender()
                    }}
                    style={pickerStyle}
                >
                    <Picker.Item value={ELanguage.ENGLISH} label={'english'} />
                    <Picker.Item value={ELanguage.GERMAN} label={'deutsch'} />
                </Picker>
            </Popup> */}
        </View>
    )
}

export default App;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    backgroundColor: Colors.basic.background,
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

const pickerStyle: ViewStyle = {
    borderWidth: 1,
    height: 70,
    overflow: 'hidden',
    width: 200,
    justifyContent: 'center'
}