import React from 'react';
import { View, ViewStyle } from 'react-native';

import { EColor, ERole, IPosition } from 'chameleon-chess-logic';

import { Styles } from '../../models/Device';

import Overlay, { OverlayType } from '../basic/Overlay';
import ColorRole from './ColorRole';

// import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

export enum PawnStatus { NORMAL, SELECTED, THREATENED }

export interface PawnProps {
    key: string;
    player: EColor;
    roles: {[fieldColor in EColor]: ERole};
    position: IPosition;
    status: PawnStatus;
    currentFieldColor: EColor;
}

const Pawn = (props: PawnProps) => (
    <View 
        style={{
            ...STYLE,
            backgroundColor: COLORS[props.player],
            top:  props.position.row * 12.5 + .75 + '%',
            left: props.position.col * 12.5 + .75 + '%',
        }}
    >
        <View style={ROLE_WRAPPER_STYLE}>
            <ColorRole
                fieldColor={EColor.RED}
                role={props.roles[EColor.RED]}
                active={EColor.RED === props.currentFieldColor}
            />
            <ColorRole
                fieldColor={EColor.GREEN}
                role={props.roles[EColor.GREEN]}
                active={EColor.GREEN === props.currentFieldColor}
            />
            <ColorRole
                fieldColor={EColor.YELLOW}
                role={props.roles[EColor.YELLOW]}
                active={EColor.YELLOW === props.currentFieldColor}
            />
            <ColorRole
                fieldColor={EColor.BLUE}
                role={props.roles[EColor.BLUE]}
                active={EColor.BLUE === props.currentFieldColor}
            />
        </View>
        {props.status === PawnStatus.SELECTED && <Overlay type={OverlayType.LIGHTEN} />}
    </View>
);

export default Pawn;

// -----------------------------------------------------------------------------

const COLORS: {[color in EColor]: string} = {
    [EColor.RED]:    '#B9542D',
    [EColor.GREEN]:  '#51A230',
    [EColor.YELLOW]: '#DDBB71',
    [EColor.BLUE]:   '#04909D',
}

const STYLE: ViewStyle = {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:'11%',
    width: '11%',
    position: 'absolute'
};

const ROLE_WRAPPER_STYLE: ViewStyle = {
    height: '80%',
    width:  '80%',
    ...Styles.flex,
};