import React from "react";
import { Image as Img, ImageSourcePropType, ImageStyle, ImageResizeMode } from "react-native";

const style: ImageStyle = {
    flex: 1,
    height: undefined,
    width:  undefined
}

interface ImageProps {
    source: ImageSourcePropType
    style?: ImageStyle
    resizeMode?: ImageResizeMode
}

const Image = (props: ImageProps) =>
    <Img
        source={props.source}
        style={[props.style, style]}
        resizeMode={props.resizeMode || 'contain'}
    />

export default Image