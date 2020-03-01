import React from 'react';
import { Image as RNImage, ImageProps as RNImageProps, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// -----------------------------------------------------------------------------

/** All react-native properties are still available. */
interface ImageProps extends RNImageProps {
    /** Enter a function here, that is called when the image is clicked. */
    onPress?: () => void;
}

/** Basic component to display an image. Use this component instead of the
 * react-native Image component.
 * 
 * It is basically an extension to the react-native Image component. All
 * react-native Image properties can be used.
 * [See react-native docs](https://facebook.github.io/react-native/docs/image)
 * for reference.
 * 
 * Differences to the react-native Image component:
 * - It sets a responsive styling for the image as a default, so it will always
 *   resize to become as wide and as tall as the parent component allows.
 * - An `onPress` function can be specified, that will be called when the image
 *   is clicked. */
const Image = (props: ImageProps) => {
    const { onPress, style, ...restProps } = props;
    return <TouchableWithoutFeedback onPress={onPress}>
        <RNImage style={[baseStyle, style]} resizeMode={'contain'} {...restProps} />
    </TouchableWithoutFeedback>;
};

export default Image;

// -----------------------------------------------------------------------------

const { baseStyle } = StyleSheet.create({
    baseStyle: {
        flex: 1,
        height: undefined,
        width:  undefined,
    },
});