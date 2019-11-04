import React, { useState } from "react";
import { View } from "react-native";
import { Texts } from "../assets";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { IViewBaseProps, EViews } from "../App";
import { Game as DBGame } from "../storage";

/* ---------------------------------- View ---------------------------------- */

interface HomeProps extends IViewBaseProps {}

const Home = (props: HomeProps) => {
    // get saved game from storage, if there is one
    const [savedGame, setSavedGame] = useState()
    DBGame.get().then((game) => {
        setSavedGame(game)
    })

    return (
        <View>
            {/* Continue Button - is only enabled if there is a game to continue */}
            <Button
                text={ Texts.Home.continue }
                onPress={ () => { props.navigate(EViews.GAME, savedGame) } }
                disabled={ !savedGame }
            />
            <Spacer size={20} />
            {/* start a new game, go to player config screen */}
            <Button 
                text={ Texts.Home.newGame }
                onPress={ () => { props.navigate(EViews.PLAYER_CONFIG) } }
            />
        </View>
    )
}

export default Home;