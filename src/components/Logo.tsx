import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { getColors, getTexts } from '../assets';

import Text from './Text';

// -----------------------------------------------------------------------------

/** This component renders the chameleon chess logo in the correct language. It
 * also resizes automatically to completely fill the width of the parent
 * component. */
const Logo = () => {
    const [fontSize, setFontSize] = useState(0);

    const textStyle = {...STYLES.text, fontSize, lineHeight: fontSize * 1.1};
    const letters = getTexts().logo.split('');

    function calcFontSize(event: LayoutChangeEvent) {
        if (fontSize === 0) {
            const { width } = event.nativeEvent.layout;
            setFontSize(width / WIDTH_DIVIDER);
        }
    }

    return <View style={STYLES.wrapper} onLayout={calcFontSize}>
        <Text>
            {letters.map((letter, i) => <Text key={i} invert={true}
                style={[textStyle, {color: FONT_COLORS[i % NUM_OF_COLORS]}]}
            >
                {letter}
            </Text>)}
        </Text>
    </View>;
};

export default Logo;

// -----------------------------------------------------------------------------

const FONT_COLORS = [
    getColors().main[0],
    getColors().main[1],
    getColors().main[2],
    getColors().main[3],
];

const NUM_OF_COLORS = FONT_COLORS.length;

const STYLES = StyleSheet.create({
    wrapper: {
        aspectRatio: 2.5,
    },
    text: {
        fontWeight: 'bold',
    }
});

const WIDTH_DIVIDER = 5.7;