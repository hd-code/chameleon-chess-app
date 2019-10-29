import React from "react";
import { View, ViewStyle } from "react-native";
import Tile, { TileProps } from "./Tile";
import Pawn, { PawnProps } from "./Pawn";

const style: ViewStyle = {
    height: 0,
    width: '100%',
    paddingBottom: '100%',
}

const styleWrapper: ViewStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexWrap: 'wrap',
    flexDirection:'row'
}

export interface BoardProps {
    tiles: TileProps[]
    pawns: PawnProps[]
}

const Board = (props: BoardProps) => (
    <View style={style}>
        <View style={styleWrapper}>
            {props.tiles.map(tile => (<Tile {...tile} />))}
            {props.pawns.map(pawn => <Pawn {...pawn} />)}
        </View>
    </View>
)


export default Board;