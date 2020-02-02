import React from "react";
import { View } from "react-native";

// -----------------------------------------------------------------------------

interface SpacerProps {
    size?: number
}

const Spacer = (props: SpacerProps) => (
    <View style={{height: props.size || DEFAULT_HEIGHT}} />
)

export default Spacer;

// -----------------------------------------------------------------------------

const DEFAULT_HEIGHT = 20;