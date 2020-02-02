import React from "react";
import { View, ViewStyle } from "react-native";

import Pawn, { PawnProps } from './Pawn';
import Field, { FieldProps } from './Field';

// -----------------------------------------------------------------------------

export interface BoardProps {
    fields: FieldProps[]
    pawns: PawnProps[]
}

const Board = (props: BoardProps) => (
    <View style={style}>
        <View style={styleWrapper}>
            { props.fields.map(field => <Field {...field} />) }
            { props.pawns .map(pawn  => <Pawn {...pawn} />) }
        </View>
    </View>
)

export default Board;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height: 0,
    width: '100%',
    paddingBottom: '100%',
}

const styleWrapper: ViewStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    flexWrap: 'wrap',
    flexDirection:'row'
}