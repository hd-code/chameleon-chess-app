import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

import { getBaseFontSize } from '../../helper';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum ETextType { NORMAL, HEADING, PARAGRAPH }

interface TextProps {
    children: string;
    style?: TextStyle;
    type?: ETextType;
}

const Text = (props: TextProps) => (
    <RNText style={[BASE_STYLE, STYLES[props.type||ETextType.NORMAL], props.style]}>
        {props.children}
    </RNText>
);

export default Text;

// -----------------------------------------------------------------------------

const FONT_SIZE = getBaseFontSize();

const BASE_STYLE: TextStyle = {
    color: getColors().basic.text
}

const STYLES: {[type in ETextType]: TextStyle} = {
    [ETextType.NORMAL]: {
        fontSize: FONT_SIZE,
        fontWeight: '600',
        textAlign: 'center',
    },
    [ETextType.HEADING]: {
        fontSize: FONT_SIZE * 2,
        fontWeight: '900',
        textAlign: 'center',
    },
    [ETextType.PARAGRAPH]: {
        fontSize: FONT_SIZE,
        fontWeight: '600',
        textAlign: 'justify',
    },
};