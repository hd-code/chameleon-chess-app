import React, { useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, StyleSheet, TouchableOpacity, View, NativeTouchEvent, ScrollView } from 'react-native';

import * as ccl from 'chameleon-chess-logic';

import { getColors, getImages } from '../assets';
import { getSmallerDimension } from '../helper';

import Image from './Image';
import Overlay, { EOverlayType } from './Overlay';

import { makeMove } from '../controller/game';

// -----------------------------------------------------------------------------

interface BoardProps extends ccl.IGame { }

/** Renders the colorful game board with all 8x8 fields. Plus the pawns on the
 * board. It also handles clicks on th board. These clicks are captured by this
 * component and then forwarded to the game controller. */
const Board = (props: BoardProps) => {
    // the currently selected pawn in the pawns array in the game object
    const [selectedPawn, selectPawn] = useState(-1);

    function handlePressOnBoard({nativeEvent}: GestureResponderEvent) {
        const clickPos = calcClickPos(nativeEvent);
        const pawnOnField = ccl.getIndexOfPawnAtPosition(props, clickPos);
        // forward click to game controller
        selectPawn( makeMove(selectedPawn, clickPos) ? -1 : pawnOnField );
    }

    return <ScrollView style={STYLES.scrollView}
            maximumZoomScale={2}
        >
        <View style={STYLES.board}>
           {getFields(props, selectedPawn)}
           {getPawns(props.pawns, selectedPawn)}
           <TouchableOpacity
               onLayout={measureBoardSize}
               onPress={handlePressOnBoard}
               style={StyleSheet.absoluteFill}
               activeOpacity={1}
           />
       </View>
    </ScrollView>;
};

export default Board;

// -----------------------------------------------------------------------------

const BOARD = ccl.getBoard();

const STYLES = StyleSheet.create({
    scrollView: {
        aspectRatio: 1,
    },
    board: {
        aspectRatio: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    field: {
        borderColor: getColors().basic.black,
        borderWidth: StyleSheet.hairlineWidth,
        height: '12.5%',
        width:  '12.499%', // 12.5% for some reason is too wide for android
    },
    pawnWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        padding: '10%',
        height: '12.5%',
        width:  '12.5%',
    },
    pawn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: getColors().basic.black,
        borderRadius: getSmallerDimension() * 0.125 * 0.1,
        height: '100%',
        width:  '100%',
        padding: '10%',
    },
    rolesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%',
        width:  '100%',
    },
    role: {
        height: '50%',
        width:  '50%',
    },
});

/** stores the dimensions of the board as soon as they are available */
let boardDim = { height: 0, width: 0 };

/** measures the board size, when it is available (react-native onLayout event)
 * and stores them in the local variable `boardDim` */
function measureBoardSize(event: LayoutChangeEvent) {
    boardDim = event.nativeEvent.layout;
}

function calcClickPos({locationX, locationY}: NativeTouchEvent): ccl.IPosition {
    return {
        row: Math.floor(locationY / boardDim.height * 8),
        col: Math.floor(locationX / boardDim.width  * 8)
    };
}

function getFields(game: ccl.IGame, selectedPawn: number) {
    const moves = ccl.getMoves(game, selectedPawn);
    const fields = BOARD.map((row, i) => row.map((color, j) =>
        getField(i+''+j, color, !isWithinLimits(i,j,game.limits), isInMoves(i,j,moves))
    ));
    return fields;
}

function isWithinLimits(i: number, j: number, limits: ccl.ILimits) {
    return limits.lower.row <= i && i <= limits.upper.row
        && limits.lower.col <= j && j <= limits.upper.col;
}

function isInMoves(i: number, j: number, moves: ccl.IPosition[]) {
    const  matches = moves.filter(move => move.row === i && move.col === j);
    return matches.length > 0;
}

function getField(key: string, color: ccl.EColor, isOffLimits: boolean, isMarked: boolean) {
    return <View style={[STYLES.field, {backgroundColor: getColors().main[color]}]} key={key}>
        {isOffLimits && <Overlay type={EOverlayType.DARKEN}/>}
        {isMarked && <Overlay type={EOverlayType.LIGHTEN}/>}
    </View>;
}

function getPawns(pawns: ccl.IPawn[], selectedPawn: number) {
    return pawns.map((pawn, i) => getPawn(pawn, i === selectedPawn));
}

function getPawn(pawn: ccl.IPawn, selected?: boolean) {
    const key = pawn.player + '' + pawn.roles[0];
    const position = {
        top:  pawn.position.row * 12.5 + '%',
        left: pawn.position.col * 12.5 + '%',
    };
    const color = {
        backgroundColor: getColors().main[pawn.player],
    };

    return <View key={key} style={[STYLES.pawnWrapper, position]}>
        <View style={[STYLES.pawn, color]}>
            <View style={STYLES.rolesWrapper}>
                {getRole(ccl.EColor.RED, pawn.roles[ccl.EColor.RED])}
                {getRole(ccl.EColor.GREEN, pawn.roles[ccl.EColor.GREEN])}
                {getRole(ccl.EColor.YELLOW, pawn.roles[ccl.EColor.YELLOW])}
                {getRole(ccl.EColor.BLUE, pawn.roles[ccl.EColor.BLUE])}
            </View>
            {selected && <Overlay type={EOverlayType.LIGHTEN} />}
        </View>
    </View>;
}

function getRole(color: ccl.EColor, role: ccl.ERole) {
    return <View style={[STYLES.role, {backgroundColor: getColors().main[color]}]}>
        <Image source={getImages().roles[role]} />
    </View>;
}