import React from 'react';
import { Image as RNImage, ImageProps as RNImageProps, ImageStyle, TouchableWithoutFeedback } from 'react-native';

// -----------------------------------------------------------------------------

export interface ImageProps extends RNImageProps {
    onPress?: () => void;
}

const Image = (props: ImageProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <RNImage
            style={STYLE}
            resizeMode={'contain'}
            {...props}
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