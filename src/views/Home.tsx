import React, { useState } from "react";
import { View } from "react-native";
import { Texts } from "../assets";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { IViewBaseProps, EViews } from "../App";
import { EColor, initGame } from "chameleon-chess-logic";
import { IGame } from "../aux/game";

const GS = initGame({[EColor.RED]: true, [1]:false, [2]: true, [3]:false})

const PB = {
    [EColor.RED]: 1,
    [EColor.GREEN]: 2,
    [EColor.YELLOW]: 1,
    [EColor.BLUE]: 0,
}

const testGame: IGame = {
    gs: GS,
    players: PB,
    selectedPawn: null
}

interface HomeProps extends IViewBaseProps {}

const Home = (props: HomeProps) => {
    const [savedGame, setSavedGame] = useState(testGame)

    return (
        <View>
            <Button
                text={ Texts.Home.continue }
                onPress={ () => { props.navigate(EViews.GAME, savedGame) } }
                disabled={ !savedGame }
            />
            <Spacer size={20} />
            <Button 
                text={ Texts.Home.newGame }
                onPress={ () => { props.navigate(EViews.PLAYER_CONFIG) } }
            />
        </View>
    )
}

export default Home;