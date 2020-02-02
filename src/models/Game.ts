import { IGameState } from 'chameleon-chess-logic';

import { TPlayers } from './PlayerType';

// -----------------------------------------------------------------------------

export interface IGame {
    players: TPlayers;
    gs: IGameState;
    selectedPawn: number|null;
}