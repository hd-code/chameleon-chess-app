import React from 'react';
import { View, ViewStyle } from 'react-native';

import { IGame, arePlayersAlive, IPosition } from 'chameleon-chess-logic';
import { TPlayers } from '../models/players';
import { INavigation } from '../models/view';

import Board from './game/Board';
import PlayerBoard from './game/PlayerBoard';
import Spacer from './basic/Spacer';

// -----------------------------------------------------------------------------

interface GameProps {
    /** The current game state. */
    game: IGame;
    /** Players participating in the game. */
    players: TPlayers;
    /** Navigation functions to go to other views. */
    navigation: INavigation;
    /** Is called immediately when this component is rendered. */
    onGameRender: () => void;
    /** Gets called when the board is clicked. Returns true if a move was made,
     * false if it stays the same. */
    onPressBoard: (pawnIndex: number, clickPos: IPosition) => boolean;
}

/** The root component for the game view. */
const Game = ({game, players, onPressBoard, onGameRender}: GameProps) => {
    onGameRender();
    const playersAlive = arePlayersAlive(game);

    return <View style={wrapperStyle}>
        <Spacer />
        <PlayerBoard playersAlive={playersAlive} players={players} playerOnTurn={game.whoseTurn} />
        <Spacer />
        <Board game={game} onPressBoard={onPressBoard} />
    </View>;
};

export default Game;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle = {
    alignItems: 'center',
    width: '100%',
}