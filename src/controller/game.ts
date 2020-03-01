import { IPosition } from 'chameleon-chess-logic';

import storage from '../storage';

import { goto, getView } from './app';

import * as gameModel from '../models/game';
import { TPlayers } from '../models/players';
import { EView } from '../models/view';

// -----------------------------------------------------------------------------

export function getGame() {
    return gameCache;
}

export function beginGame(players: TPlayers) {
    const game = gameModel.createGame(players);

    if (!game) {
        console.warn('controller/game.ts: New game could not be created');
        return;
    }

    saveGame(game);
}

/** Returns true if a move is actually made. */
export function makeMove(pawnIndex: number, clickPos: IPosition) {
    if (gameCache === null || gameModel.isComputerMove(gameCache)) return false;

    const game = gameModel.makeMove(gameCache, pawnIndex, clickPos);
    if (game === null) return false;

    saveGame(game);
    return true;
}

export function onGameRender() {
    if (!gameCache) {
        console.warn('controller/game.ts: Prevented game render with missing game data.');
        goto.home();
        return;
    }

    if (gameModel.isGameOver(gameCache)) {
        removeGame();
        return;
    }

    // If it is a computer move, do computer move asynchronously. Otherwise the
    // UI is blocked from any interaction as the main thread is calculating the
    // computer move and cannot do anything else.
    if (gameModel.isComputerMove(gameCache)) {
        setTimeout(() => { makeComputerMove() }, 10);
    }
}

export async function loadGame() {
    const storedGame = await storage.read<gameModel.IGame>(STORAGE_KEY);
    if (gameModel.isGame(storedGame)) {
        gameCache = storedGame;
    }
}

// -----------------------------------------------------------------------------

const STORAGE_KEY = 'game';

const COMPUTER_TURN_LENGTH = 1000;

let gameCache: gameModel.IGame|null = null;

function saveGame(game: gameModel.IGame) {
    gameCache = game;
    storage.write(STORAGE_KEY, game);
    goto.game();
}

function removeGame() {
    gameCache = null;
    storage.remove(STORAGE_KEY);
}

function makeComputerMove() {
    if (!gameCache || !gameModel.isComputerMove(gameCache)) return;

    const begin = new Date().getTime();
    const newGame = gameModel.makeComputerMove(gameCache);
    const end = new Date().getTime();

    // Do not do computer move immediately, but wait for a small amount of time.
    setTimeout(() => {
        // only save new game if still on game view
        if (getView() === EView.GAME) {
            saveGame(newGame);
        }
    }, COMPUTER_TURN_LENGTH - (end - begin));
}