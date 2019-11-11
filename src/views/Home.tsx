import React from "react";
import { View } from "react-native";

import Button from "../components/Button";
import Spacer from "../components/Spacer";

import { getTexts } from "../assets";
import { ViewProps } from "../navigation";
import { Game as DBGame } from "../storage";

/* ---------------------------------- View ---------------------------------- */

interface HomeProps extends ViewProps {}

const Home = (props: HomeProps) => (
    <View>
        {/* Continue Button - is only enabled if there is a game to continue */}
        <Button
            text={ getTexts().Home.continue }
            onPress={ () => { props.navigate.game() } }
            disabled={ !DBGame.get() }
        />
        <Spacer size={20} />
        {/* start a new game, go to player config screen */}
        <Button 
            text={ getTexts().Home.newGame }
            onPress={ () => { props.navigate.playerConfig() } }
        />
    </View>
)

export default Home;