import React from 'react';
import { Image as Img, ImageSourcePropType, ImageStyle, ImageResizeMode, TouchableWithoutFeedback } from 'react-native';

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
            style={[STYLE, props.style]}
            resizeMode={props.resizeMode || 'contain'}
        />
    </TouchableWithoutFeedback>
);

export default Image;

// -----------------------------------------------------------------------------

const STYLE: ImageStyle = {
    flex: 1,
    height: undefined,
    width:  undefined,
};