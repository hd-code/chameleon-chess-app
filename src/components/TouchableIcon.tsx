import React from "react";
import { TouchableOpacity } from "react-native";

import Image, { ImageProps } from "./Image";

/* ------------------------------- Component -------------------------------- */

interface TouchableIconProps extends ImageProps {
    onPress: () => any
}

const TouchableIcon = (props: TouchableIconProps) =>
    <TouchableOpacity
        onPress={props.onPress} 
        activeOpacity={1}
        style={{width:'100%', height:'100%'}}
    >
        <Image
            source={props.source}
            style={props.style}
            resizeMode={props.resizeMode || 'contain'}
        />
    </TouchableOpacity>

export default TouchableIcon;

/* --------------------------------- Styles --------------------------------- */
/* --------------------------------- Assets --------------------------------- */