import React, { useState } from 'react';
import { View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { deepClone } from '../../lib/hd-helper';

import { IAppController } from '../App';
import AppState from '../AppState';

import Button from './basic/Button';
import Spacer from './basic/Spacer';
import Text, { ETextType } from './basic/Text';
import Players, { PlayersProps } from './game/Players';

import { getDefaultPlayers, getNextPlayerType, isEnoughPlayersForGame } from '../models/PlayerType';
import { createGame } from '../models/Game';
import { getTexts } from '../models/Texts';

// -----------------------------------------------------------------------------

interface PlayerConfigProps {
    controller: IAppController;
}

const PlayerConfig = (props: PlayerConfigProps) => {
    const [players, setPlayers] = useState(getDefaultPlayers());

    function changePlayers(player: EColor) {
        let newPlayers = deepClone(players);
        newPlayers[player] = getNextPlayerType(players[player]);
        setPlayers(newPlayers);
    }

    function beginGame() {
        const GameData = createGame(players);
        if (!GameData)
            return console.error('IGame Object could not be created!');
            
        AppState.Game.set(GameData);
        props.controller.goTo.Game();
    }

    const playersProps: PlayersProps = {
        [EColor.RED]: {
            player:       EColor.RED,
            type: players[EColor.RED],
            onPress: () => changePlayers(EColor.RED)
        },
        [EColor.GREEN]: {
            player:       EColor.GREEN,
            type: players[EColor.GREEN],
            onPress: () => changePlayers(EColor.GREEN)
        },
        [EColor.YELLOW]: {
            player:       EColor.YELLOW,
            type: players[EColor.YELLOW],
            onPress: () => changePlayers(EColor.YELLOW)
        },
        [EColor.BLUE]: {
            player:       EColor.BLUE,
            type: players[EColor.BLUE],
            onPress: () => changePlayers(EColor.BLUE)
        },
    }

    return (
        <View>
            <Text type={ETextType.HEADING}>{getTexts().PlayerConfig.heading}</Text>
            <Spacer />
            <Players {...playersProps} />
            <Spacer />
            <Button 
                text={ getTexts().PlayerConfig.beginGame }
                onPress={ beginGame }
                disabled={ !isEnoughPlayersForGame(players) }
            />
            <Spacer />
            <Text>{getTexts().PlayerConfig.explanation}</Text>
        </View>
    );
}

export default PlayerConfig;

// -----------------------------------------------------------------------------