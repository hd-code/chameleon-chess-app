import { IPosition } from 'chameleon-chess-logic';

import AppState from '../AppState';

import { createGame, isComputerTurn, advanceGame } from '../models/Game';
import { TPlayers } from '../models/Players';
import { EView } from '../models/View';

// -----------------------------------------------------------------------------

export function beginGame(players: TPlayers) {
    const game = createGame(players);
    if (game === null)
        return console.log('game could not be created');

    AppState.Game.set(game);
    AppState.View.set(EView.GAME);
}

export function handleClick(clickPos: IPosition) {
    const currentGameData = AppState.Game.get();
    if (currentGameData === null)
        return false;

    if (isComputerTurn(currentGameData))
        return false;

    const newGameData = advanceGame(currentGameData, clickPos);
    AppState.Game.set(newGameData);

    return true;
}