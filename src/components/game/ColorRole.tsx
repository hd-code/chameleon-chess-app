import React from 'react';
import { View, ViewStyle } from 'react-native';

import { EColor, ERole } from 'chameleon-chess-logic';

import Image from '../basic/Image';

// import { getColors } from '../../models/Colors';
// import { getImages } from '../../models/Images';

// -----------------------------------------------------------------------------

interface ColorRoleProps {
    fieldColor: EColor;
    role: ERole;
    active: boolean;
}

const ColorRole = (props: ColorRoleProps) => (
    <View 
        style={[
            STYLE, { backgroundColor: COLORS[props.fieldColor] },
            props.active && {borderWidth: 1}
        ]}
    >
        <Image source={IMAGES[props.role]} />
    </View>
);

export default ColorRole;

// -----------------------------------------------------------------------------

const STYLE: ViewStyle = {
    borderColor: '#fff',
    height:'50%',
    width: '50%',
};

const COLORS: {[color in EColor]: string} = {
    [EColor.RED]:    '#B9542D',
    [EColor.GREEN]:  '#51A230',
    [EColor.YELLOW]: '#DDBB71',
    [EColor.BLUE]:   '#04909D',
}

const IMAGES = {
    [ERole.KNIGHT]: require('../../../assets/images/knight.png'),
    [ERole.QUEEN]:  require('../../../assets/images/queen.png'),
    [ERole.BISHOP]: require('../../../assets/images/bishop.png'),
    [ERole.ROOK]:   require('../../../assets/images/rook.png'),
};