import React from "react";
import { Text as RNText, TextStyle } from "react-native";

import { getBaseFontSize } from '../../helper';

// -----------------------------------------------------------------------------

interface TextProps {
    children: string;
    style?: TextStyle;
}

const Text = (props: TextProps) => (
    <RNText style={[style, props.style]}>{props.children}</RNText>
);

export default Text;

// -----------------------------------------------------------------------------

const FONT_SIZE = getBaseFontSize();

const style: TextStyle = {
    fontSize: FONT_SIZE,
    textAlign: 'center',
};

// TODO: Heading, Text Block.