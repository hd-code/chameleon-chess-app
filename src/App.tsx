import React from "react";
import { View, ViewStyle } from "react-native";
import Game from "./views/Game";

const style: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

const App = () => (
    <View style={style}>
        <Game />
    </View>
)

export default App;