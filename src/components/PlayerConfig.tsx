import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Button from './Button';
import Player from './Player';
import Spacer from './Spacer';
import Text from './Text';
import Topbar from './Topbar';

import { beginGame } from '../controller/game';

import * as Players from '../models/players';

// -----------------------------------------------------------------------------

/** The root component for the player configuration view.
 * 
 * It lets the user configure how many players and of which type, should
 * participate in a game. Then a game can be started in that configuration.
 */
const PlayerConfig = () => {
    const [players, setPlayers] = useState(Players.getDefaultPlayers());

    function updatePlayers(player: EColor) {
        const newPlayers = Players.updatePlayers(players, player);
        setPlayers(newPlayers);
    }

    return <>
        <Topbar />
        
        <View style={STYLES.wrapper}>
            <Text invert={true} scale={1.8}>
                {getTexts().playerConfig.heading}
            </Text>

            <Spacer />

            {getPlayers(players, updatePlayers)}

            <Spacer />

            <Text invert={true}>
                {getTexts().playerConfig.subText}
            </Text>

            <Spacer />

            <Button onPress={() => { beginGame(players); }}
                disabled={!Players.isEnoughPlayers(players)}
            >
                {getTexts().playerConfig.button}
            </Button>
        </View>

        <View />
    </>;
};

export default PlayerConfig;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    homeButton: {
        position: 'absolute',
        top: 0, left: 0,
        height: getBaseFontSize() * 3,
        width:  getBaseFontSize() * 3,
    },
    wrapper: {
        alignItems: 'center',
        maxWidth: '100%',
        width: getBaseFontSize() * 30,
    },
    playersWrapper: {
        flexDirection: 'row',
    },
    playerWrapper: {
        width: '25%',
    },
});

function getPlayers(players: Players.TPlayers, click: (player: EColor) => void) {
    return <View style={STYLES.playersWrapper}>
        {getPlayer(EColor.RED,    players[EColor.RED],    () => {click(EColor.RED)})}
        {getPlayer(EColor.BLUE,   players[EColor.BLUE],   () => {click(EColor.BLUE)})}
        {getPlayer(EColor.YELLOW, players[EColor.YELLOW], () => {click(EColor.YELLOW)})}
        {getPlayer(EColor.GREEN,  players[EColor.GREEN],  () => {click(EColor.GREEN)})}
    </View>;
}

function getPlayer(color: EColor, type: Players.EPlayerType, onClick: () => void) {
    return <View style={STYLES.playerWrapper}>
        <Player color={color} type={type} verbose={true} onPress={onClick} />
    </View>;
}