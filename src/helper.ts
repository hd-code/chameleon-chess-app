import { Dimensions, ViewStyle } from "react-native";

// -----------------------------------------------------------------------------

/** Collection of styles that are used again and again in various components. */
export const Styles = {
    coverParent: <ViewStyle>{ position:'absolute', top:0, bottom:0, left:0, right:0 },
    flex:        <ViewStyle>{ flexDirection:'row', flexWrap:'wrap' },
    flexJustify: <ViewStyle>{ flexDirection:'row', justifyContent:'space-between' },
}

/** Returns the dimensions (`height` and `width`) of the screen in pixels. */
export function getScreenDim() {
    return Dimensions.get('screen');
}

/** Returns either the `height` or the `width` of the screen in pixels. It
 * returns the smaller of the two. */
export function getSmallerDim() {
    const dim = getScreenDim();
    return Math.min(dim.width, dim.height);
}

/** Returns a basic font size in pixels. The font sizes is calculated such that
 * text written in that size is comfortably readable on the current device.
 * Use this as a reference when dealing with text elements. */
export function getBaseFontSize() {
    return Math.max(getSmallerDim() / 40, MIN_FONT_SIZE);
}

// -----------------------------------------------------------------------------

const MIN_FONT_SIZE = 16;