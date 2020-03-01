import React from 'react';
import { View, StyleSheet } from 'react-native';

import { getColors, getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Button from './Button';
import Logo from './Logo';
import Spacer from './Spacer';

import { goto } from '../controller/app';
import { getGame } from '../controller/game';

// -----------------------------------------------------------------------------

/** The root component for the home view. This is the start screen of the app. */
const Home = () => <>
    <View />

    <View style={STYLES.wrapper}>
        <Logo />

        <Spacer scale={2} />
        
        <Button onPress={goto.game} color={getColors().main[0]} disabled={getGame() === null}>
            {getTexts().home.buttons.continue}
        </Button>

        <Spacer />

        <Button onPress={goto.playerConfig} color={getColors().main[1]}>
            {getTexts().home.buttons.newGame}
        </Button>

        <Spacer />

        <Button onPress={() => {}} color={getColors().main[2]} disabled={true}>
            {getTexts().home.buttons.tutorial}
        </Button>

        <Spacer />

        <Button onPress={goto.settings} color={getColors().main[3]}>
            {getTexts().home.buttons.settings}
        </Button>
    </View>

    <View />
</>;

export default Home;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        width: getBaseFontSize() * 28,
        maxWidth: '100%',
    },
});