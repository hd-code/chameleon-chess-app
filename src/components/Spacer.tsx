import React from "react";
import { View } from "react-native";

interface SpacerProps {
    size: number
}

const Spacer = (props: SpacerProps) => (
    <View style={{height: props.size}} />
)

export default Spacer;