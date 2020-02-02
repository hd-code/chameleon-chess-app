import React from "react";
import { View, Text } from "react-native";

import { IAppController } from '../App';
import AppState from '../AppState';

import Button from './basic/Button';
import Spacer from './basic/Spacer';

import { getTexts } from '../models/Texts';

// -----------------------------------------------------------------------------

interface HomeProps {
    controller: IAppController;
}

const Home = (props: HomeProps) => (
    <View>
        <Button
            text={getTexts().Home.continue}
            onPress={ props.controller.goTo.Game }
            disabled={ !AppState.Game.get() }
        />

        <Spacer />

        <Button
            text={getTexts().Home.newGame}
            onPress={ props.controller.goTo.PlayerConfig }
        />

        <Spacer />

        <Button
            text={getTexts().Home.tutorial}
            onPress={ props.controller.goTo.PlayerConfig }
            disabled={ true }
        />
    </View>
);

export default Home;