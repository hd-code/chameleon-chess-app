import React from 'react';
import { View, ViewStyle } from 'react-native';

import { getBaseFontSize } from '../../helper';

import { EColor } from 'chameleon-chess-logic';
import { TPlayers } from '../../models/players';

import Player from './Player';

// -----------------------------------------------------------------------------

interface PlayerBoardProps {
    /** The player that is currently on turn. */
    playerOnTurn: EColor;
    /** Players participating in the game. */
    players: TPlayers;
    /** An object with each player plus a boolean indicating whether the player
     * is still alive. The function `arePlayersAlive` from `chameleon-chess-logic`
     * returns exactly this data structure. */
    playersAlive: {[player in EColor]: boolean};
}

/** Displays the four players in the game view and there current state. */
const PlayerBoard = ({playersAlive, playerOnTurn, players}: PlayerBoardProps) => 
    <View style={wrapperStyle}>
        {getPlayer(EColor.RED, playerOnTurn, players, playersAlive)}
        {getPlayer(EColor.BLUE, playerOnTurn, players, playersAlive)}
        {getPlayer(EColor.YELLOW, playerOnTurn, players, playersAlive)}
        {getPlayer(EColor.GREEN, playerOnTurn, players, playersAlive)}
    </View>
;

export default PlayerBoard;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: '100%',
    width: getBaseFontSize() * 28,
}

function getPlayer(player: EColor, playerOnTurn: EColor, players: TPlayers, playersAlive: {[player in EColor]: boolean}) {
    return <View style={{width: '25%'}}>
        <Player
            color={player} type={players[player]}
            isDead={!playersAlive[player]}
            isOnTurn={player === playerOnTurn}
        />
    </View>
}