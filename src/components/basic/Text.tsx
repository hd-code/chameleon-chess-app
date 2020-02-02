import React from "react";
import { Text as RNText, TextStyle } from "react-native";

import { getSmallerDim } from '../../helper';

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

const DYN_FONT_SIZE = getSmallerDim() / 40;
const MIN_FONT_SIZE = 20;

const style: TextStyle = {
    fontSize: Math.max(DYN_FONT_SIZE, MIN_FONT_SIZE),
    textAlign: 'center',
};