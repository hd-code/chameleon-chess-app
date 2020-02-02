import React from "react";
import { Image as Img, ImageSourcePropType, ImageStyle, ImageResizeMode, TouchableWithoutFeedback } from "react-native";

// -----------------------------------------------------------------------------

export interface ImageProps {
    source: ImageSourcePropType;
    style?: ImageStyle;
    resizeMode?: ImageResizeMode;
    onPress?: () => void;
}

const Image = (props: ImageProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <Img
            source={props.source}
            style={[style, props.style]}
            resizeMode={props.resizeMode || 'contain'}
        />
    </TouchableWithoutFeedback>
);

export default Image;

// -----------------------------------------------------------------------------

const style: ImageStyle = {
    flex: 1,
    height: undefined,
    width:  undefined,
};