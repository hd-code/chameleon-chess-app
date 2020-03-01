import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getColors, getImages, getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Image from './Image';
import Spacer from './Spacer';
import Text from './Text';

import { EPlayerType } from '../models/players';

// -----------------------------------------------------------------------------

interface PlayerProps {
    /** The player's color */
    color: EColor;
    /** The player's type */
    type:  EPlayerType;
    /** If set to true, in addition to the icon that shows the player type, a
     * text will be displayed underneath the icon as well. The text describes
     * the player type verbally. */
    verbose?: boolean;
    /** You may enter a function to be called when this card is clicked. */
    onPress?: () => void;
}

/** Displays a card that shows information about a player. The color, the type etc. */
const Player = (props: PlayerProps) =>
    <View style={[STYLES.wrapper, {backgroundColor: getColors().main[props.color]}]}>
        <Text style={STYLES.heading}>
            {getTexts().player[props.color]}
        </Text>

        <Spacer scale={.5} />
        
        <View style={STYLES.imageWrapper}>
            <Image source={getImages().playerTypes[props.type]} style={StyleSheet.absoluteFill} />
        </View>

        {props.verbose && <>
            <Spacer scale={.5} />
            <Text style={STYLES.subText}>
                {getTexts().playerType[props.type]}
            </Text>
        </>}

        {props.onPress && <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>}
    </View>
;

export default Player;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        borderWidth: 1,
        padding: getBaseFontSize() * .3,
    },
    heading: {
        fontWeight: 'bold',
    },
    imageWrapper: {
        aspectRatio: 1,
        width: '50%',
    },
    subText: {
        fontStyle: 'italic',
    },
});