import React from "react";
import { Text as RNText, TextStyle, Dimensions } from "react-native";

/* ------------------------------- Component -------------------------------- */

interface HeadingProps {
    children: string
    style?: TextStyle
}

const Heading = (props: HeadingProps) => (
    <RNText style={[style, props.style]}>{props.children}</RNText>
)

export default Heading;

/* --------------------------------- Styles --------------------------------- */

const screenDim = Dimensions.get('screen')
const dynFontSize = Math.min(screenDim.height, screenDim.width) / 40
const minFontSize = 20

const style: TextStyle = {
    fontSize: Math.max(dynFontSize, minFontSize)
}

/* --------------------------------- Assets --------------------------------- */