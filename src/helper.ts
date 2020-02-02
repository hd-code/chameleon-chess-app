import { Dimensions } from "react-native";

// -----------------------------------------------------------------------------

export function getScreenDim() {
    return Dimensions.get('screen');
}

export function getSmallerDim() {
    const dim = getScreenDim();
    return Math.min(dim.width, dim.height);
}