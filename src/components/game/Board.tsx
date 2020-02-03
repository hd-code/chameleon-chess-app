import React from "react";
import { View, ViewStyle } from "react-native";

import { Styles } from '../../helper';

import Field, { FieldProps } from './Field';
import Pawn, { PawnProps } from './Pawn';

// -----------------------------------------------------------------------------

export interface BoardProps {
    fields: FieldProps[];
    pawns: PawnProps[];
}

const Board = (props: BoardProps) => (
    <View style={style}>
        <View style={[Styles.coverParent, Styles.flex]}>
            { props.fields.map(field => <Field {...field} />) }
            { props.pawns .map(pawn  => <Pawn {...pawn} />) }
        </View>
    </View>
);

export default Board;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height: 0,
    width: '100%',
    paddingBottom: '100%',
};