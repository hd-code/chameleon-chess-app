import React from 'react';
import { View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize } from '../models/Device';

import Logo from './basic/Logo';
import Button from './basic/Button';
import Spacer from './basic/Spacer';

import { ELanguage } from '../models/Language';

// -----------------------------------------------------------------------------

export interface HomeProps {
    language: ELanguage;
}

const Home = (props: HomeProps) => (
    <View style={{width: getBaseFontSize() * 18}}>
        <Logo language={props.language} />

        <Spacer scale={2} />

        <Button
            color={EColor.RED}
            text={BUTTON_TEXTS[props.language].continue}
            onPress={ () => {} }
        />

        <Spacer />

        <Button
            color={EColor.YELLOW}
            text={BUTTON_TEXTS[props.language].newGame}
            onPress={ () => {} }
        />

        <Spacer />

        <Button
            color={EColor.GREEN}
            text={BUTTON_TEXTS[props.language].tutorial}
            onPress={ () => {} }
            disabled={true}
        />

        <Spacer />

        <Button
            color={EColor.BLUE}
            text={BUTTON_TEXTS[props.language].settings}
            onPress={ () => {} }
        />
    </View>
);

export default Home;

// -----------------------------------------------------------------------------

const BUTTON_TEXTS = {
    [ELanguage.ENGLISH]: {
        continue: 'Continue',
        newGame:  'New Game',
        tutorial: 'Tutorial',
        settings: 'Settings',
    },
    [ELanguage.GERMAN]: {
        continue: 'Fortsetzen',
        newGame:  'Neues Spiel',
        tutorial: 'Tutorial',
        settings: 'Einstellung',
    },
}