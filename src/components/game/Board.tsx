import React from 'react';
import { View, ViewStyle, TouchableOpacity, LayoutChangeEvent, GestureResponderEvent } from 'react-native';

import { IPosition } from 'chameleon-chess-logic';

import { handleClick } from '../../controller/Game';

import { Styles } from '../../models/Device';

import Field, { FieldProps } from './Field';
import Pawn, { PawnProps } from './Pawn';

// -----------------------------------------------------------------------------

export interface BoardProps {
    fields: FieldProps[];
    pawns: PawnProps[];
}

const Board = (props: BoardProps) => (
    <View style={style}>
        <View style={[Styles.coverParent, Styles.flex]} onLayout={measureBoardSize} >
            { props.fields.map(field => <Field {...field} />) }
            { props.pawns .map(pawn  => <Pawn {...pawn} />) }
        </View>

        <TouchableOpacity
            onPress={handlePressOnBoard}
            style={ Styles.coverParent }
            activeOpacity={1}
        />
    </View>
);

export default Board;

// -----------------------------------------------------------------------------

const style: ViewStyle = {
    height: 0,
    width: '100%',
    paddingBottom: '100%',
};

/** This variable stores the dimensions of the board as soon as they are available. */
let board = { height: 0, width:  0 };

/** Measures the board size using the onLayout event. Dimensions get stored to
 * the variable `board`. */
function measureBoardSize(event: LayoutChangeEvent) {
    board = event.nativeEvent.layout;
}

function calcClickPos(x: number, y: number): IPosition {
    return {
        row: Math.floor(y / board.height * 8),
        col: Math.floor(x / board.width  * 8)
    };
}

function handlePressOnBoard(event: GestureResponderEvent): void {
    const {locationX, locationY} = event.nativeEvent;
    const clickPos = calcClickPos(locationX, locationY);
    handleClick(clickPos);
}