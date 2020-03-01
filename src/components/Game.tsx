import React from 'react';
import { StyleSheet, View } from 'react-native';

import { EColor, arePlayersAlive } from 'chameleon-chess-logic';

import { getColors, getTexts } from '../assets';
import { getBaseFontSize } from '../helper';

import Board from './Board';
import Button from './Button';
import Overlay, { EOverlayType } from './Overlay';
import Player from './Player';
import Popup from './Popup';
import Spacer from './Spacer';
import Text from './Text';
import Topbar from './Topbar';

import { goto } from '../controller/app';
import { onGameRender, beginGame } from '../controller/game';

import { IGame, getWinner } from '../models/game';

// -----------------------------------------------------------------------------

interface GameProps extends IGame { }

/** The root component for the game view. */
const Game = (props: GameProps) => {
    onGameRender(); // inform game controller of rendering

    return <>
        <Topbar />

        <View style={STYLES.main}>
            {getPlayers(props)}
            <Spacer />
            <Board {...props} />
        </View>

        <View />

        {renderWinner(props)}
    </>;
}

export default Game;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    main: {
        width: '99%',
    },
    players: {
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    player: {
        width: '25%',
        maxWidth: getBaseFontSize() * 7,
    },
    overlayOnTurn: {
        backgroundColor: 'transparent',
        borderColor: getColors().shader.lighten,
        borderWidth: StyleSheet.hairlineWidth * 10,
    },
    winnerPopup: {
        maxWidth: '100%',
        width: getBaseFontSize() * 30,
    }
});

function renderWinner(props: GameProps) {
    const winner = getWinner(props);

    if (winner === null) return;

    return <Popup style={STYLES.winnerPopup}>
        <Text invert={true} scale={1.8}>
            {getTexts().player[winner] + ' ' + getTexts().game.winning}
        </Text>

        <Spacer scale={2} />

        <Button color={getColors().main[0]} onPress={goto.home}>
            {getTexts().game.buttons.home}
        </Button>

        <Spacer />

        <Button color={getColors().main[1]} onPress={goto.playerConfig}>
            {getTexts().game.buttons.newGame}
        </Button>

        <Spacer />
        
        <Button color={getColors().main[2]} onPress={() => {beginGame(props.players)}}>
            {getTexts().game.buttons.replay}
        </Button>
    </Popup>;
}

function getPlayers(props: GameProps) {
    const playersAlive = arePlayersAlive(props);

    return <View style={STYLES.players}>
        {getPlayer(EColor.RED, props, playersAlive)}
        {getPlayer(EColor.BLUE, props, playersAlive)}
        {getPlayer(EColor.YELLOW, props, playersAlive)}
        {getPlayer(EColor.GREEN, props, playersAlive)}
    </View>;
}

function getPlayer(player: EColor, props: GameProps, playersAlive: {[player in EColor]: boolean}) {
    // const style = isPortrait() ? STYLES.playerPortrait : {};

    const type = props.players[player];
    const isDead = !playersAlive[player];
    const onTurn = player === props.whoseTurn;

    return <View style={STYLES.player}>
        <Player color={player} type={type} />
        {isDead && <Overlay type={EOverlayType.DARKEN} />}
        {onTurn && <Overlay type={EOverlayType.LIGHTEN} style={STYLES.overlayOnTurn} />}
    </View>;
}