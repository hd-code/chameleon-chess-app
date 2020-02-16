import React from 'react';
import { Text as RNText, TextStyle, View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize, Styles } from '../../models/Device';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum ETextType { NORMAL, HEADING, BUTTON, LOGO }

interface TextProps {
    children: string;
    type?: ETextType;
}

const Text = (props: TextProps) => {
    const text = props.children;
    const type = props.type || ETextType.NORMAL;
    const style = [BASE_STYLE, STYLES[type]];

    switch (type) {
        case ETextType.NORMAL: return (
            <View>
                <RNText style={style} >{text}</RNText>
                {getFontOutline(text, style)}
            </View>
        );
        case ETextType.HEADING:
        case ETextType.BUTTON: return (
            <View>
                <RNText style={style} >{text}</RNText>
                {getFontOutline(text, style)}
            </View>
        );
        case ETextType.LOGO: return (
            <View>
                {getLogoStyleString(text, style)}
                {getFontOutline(text, style)}
            </View>
        );
    }
}

export default Text;

// -----------------------------------------------------------------------------

const FONT_SIZE = getBaseFontSize();

const BASE_STYLE: TextStyle = {
    color: getColors().basic.white,
    fontSize: FONT_SIZE,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    zIndex: 2,
}

const STYLES = {
    [ETextType.NORMAL]: {

    },
    [ETextType.HEADING]: {
        color: getColors().basic.white,
        fontFamily: 'OpenSans-Bold',
        fontSize: FONT_SIZE * 1.8,
    },
    [ETextType.BUTTON]: {
        color: getColors().basic.white,
        fontFamily: 'OpenSans-Bold',
        fontSize: FONT_SIZE * 1.1,
    },
    [ETextType.LOGO]: {
        color: getColors().basic.white,
        fontFamily: 'OpenSans-Bold',
        fontSize:   FONT_SIZE * 3,
        lineHeight: FONT_SIZE * 3.2,
    },
};

function getFontOutline(text: string, styles: TextStyle[]) {
    const style = [
        ...styles,
        {...Styles.coverParent,
        color: getColors().basic.black,
        textShadowColor: getColors().basic.black,
        textShadowRadius: 0,}
    ]

    const w = 1;

    return (
        <View style={Styles.coverParent}>
            <RNText style={[...style, {textShadowOffset: { width: w, height: w}}]}>{text}</RNText>
            <RNText style={[...style, {textShadowOffset: { width:-w, height: w}}]}>{text}</RNText>
            <RNText style={[...style, {textShadowOffset: { width: w, height:-w}}]}>{text}</RNText>
            <RNText style={[...style, {textShadowOffset: { width:-w, height:-w}}]}>{text}</RNText>
        </View>
    );
}

function getLogoStyleString(text: string, style: TextStyle|TextStyle[]) {
    const letters = text.split('');
    return (
        <RNText style={style}>
            {letters.map((letter, i) => 
                <RNText style={{color: getColors().main[(i%4 as EColor)]}} key={i}>
                    {letter}
                </RNText>)
            }
        </RNText>
    );
}