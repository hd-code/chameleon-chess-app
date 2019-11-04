import React, { useState } from "react";
import { View, ViewStyle } from "react-native";
import Game from "./views/Game";
import Home from "./views/Home";
import PlayerConfig from "./views/PlayerConfig";
import { IGame } from "./types";



export enum EViews { HOME, PLAYER_CONFIG, GAME }

export interface IViewBaseProps {
    navigate: (view: EViews, props?: any) => void
}

let viewProps:IGame|null = null

// TODO: Typechecking for viewProps
// maybe: Better navigation func ? Generic ?

const App = () => {
    const [view, setView] = useState(EViews.HOME)

    function navigate(view: EViews, props?: IGame) {
        viewProps = props || viewProps
        setView(view)
    }

    return (
        <View style={style}>
            <View style={wrapper}>
                {view === EViews.HOME && <Home navigate={navigate} />}
                {view === EViews.PLAYER_CONFIG && <PlayerConfig navigate={navigate} />}
                {view === EViews.GAME && viewProps !== null && <Game navigate={navigate} gameData={viewProps} />}
            </View>
        </View>
    )
}

export default App;

/* --------------------------------- Styles --------------------------------- */

const style: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

const wrapper: ViewStyle = {
    width: '95%'
}