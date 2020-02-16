import React, { useState } from 'react';
import { View } from 'react-native';

import { EColor } from 'chameleon-chess-logic';

import { getBaseFontSize } from '../models/Device';

import Button from './basic/Button';
import Logo from './basic/Logo';
import Spacer from './basic/Spacer';
import Text, { ETextType } from './basic/Text';
import Players, { PlayersProps } from './game/Players';

import { TPlayers, getDefaultPlayers, getNextPlayerType, isEnoughPlayersForGame } from '../models/Players';
import { ELanguage } from '../models/Language';
import { getTexts } from '../models/Texts';

// -----------------------------------------------------------------------------

interface PlayerConfigProps {
    language: ELanguage
}

const PlayerConfig = (props: PlayerConfigProps) => {
    const [players, setPlayers] = useState(getDefaultPlayers());

    function changePlayers(player: EColor) {
        let newPlayers = {...players};
        newPlayers[player] = getNextPlayerType(players[player]);
        setPlayers(newPlayers);
    }

    const playersProps = getPlayersProps(players, changePlayers);

    function beginGame() {
        // const GameData = createGame(players);
        // if (!GameData)
        //     return console.error('IGame Object could not be created!');
            
        // AppState.Game.set(GameData);
        // props.controller.goTo.Game();
    }

    return (
        <View style={{alignItems: 'center'}}>
            {/* <Logo language={props.language} /> */}

            {/* <Spacer scale={2} /> */}

            <Text type={ETextType.HEADING}>{getTexts().PlayerConfig.heading}</Text>

            <Spacer />

            <Players {...playersProps} />

            <Spacer />

            <Text>{getTexts().PlayerConfig.explanation}</Text>

            <Spacer />

            <View style={{width: getBaseFontSize() * 16}}>
                <Button 
                    color={EColor.GREEN}
                    text={ getTexts().PlayerConfig.beginGame }
                    onPress={ beginGame }
                    disabled={ !isEnoughPlayersForGame(players) }
                />
            </View>
        </View>
    );
}

export default PlayerConfig;

// -----------------------------------------------------------------------------

function getPlayersProps(players: TPlayers, changePlayer: (player: EColor) => void): PlayersProps {
    return {
        [EColor.RED]: {
            player:       EColor.RED,
            type: players[EColor.RED],
            onPress: () => changePlayer(EColor.RED)
        },
        [EColor.GREEN]: {
            player:       EColor.GREEN,
            type: players[EColor.GREEN],
            onPress: () => changePlayer(EColor.GREEN)
        },
        [EColor.YELLOW]: {
            player:       EColor.YELLOW,
            type: players[EColor.YELLOW],
            onPress: () => changePlayer(EColor.YELLOW)
        },
        [EColor.BLUE]: {
            player:       EColor.BLUE,
            type: players[EColor.BLUE],
            onPress: () => changePlayer(EColor.BLUE)
        },
    }
}