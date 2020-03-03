import { onStateChange } from '../App';
import storage from '../storage';

import { getView } from './view';

import * as ccl from 'chameleon-chess-logic';
import * as cclExt from '../models/game';
import { TPlayers } from '../models/players';
import { EView } from '../models/view';

// -----------------------------------------------------------------------------

/** Returns the game from the game cache. */
export function getGame() {
    return game;
}

/** Returns true if a new game was created and stored in the cache. */
export function onBeginGame(players: TPlayers): boolean {
    const newGame = cclExt.createGame(players);
    if (!newGame) return false;

    game = newGame;
    saveGame();
    return true;
}

/** Returns true if a move was made and the game has advanced. */
export function onPressBoard(pawnIndex: number, clickPos: ccl.IPosition): boolean {
    if (!game) {
        console.warn('controller/game.ts: No stored game!')
        return false;
    }

    if (cclExt.isComputerMove(game)) return false;

    const newGame = cclExt.makeMove(game, pawnIndex, clickPos);
    if (!newGame) return false;

    game = newGame;
    saveGame();
    onStateChange();
    return true;
}

/** Handles game over and computer moves. */
export function onGameRender() {
    if (!game) return console.warn('controller/game.ts: No stored game!');

    if (ccl.isGameOver(game)) {
        removeGame();
        return;
    }

    if (cclExt.isComputerMove(game)) {
        // Do computer move asynchronously, otherwise the UI is blocked.
        setTimeout(doComputerMove, 1);
    }
}

// -----------------------------------------------------------------------------

const storageKey = 'game';
const computerTurnLength = 1000; // in milliseconds

let game: cclExt.IGameExt|null = null;

function doComputerMove() {
    if (!game || !cclExt.isComputerMove(game)) return;

    const begin = new Date().getTime();
    const newGame = cclExt.makeComputerMove(game);
    const end = new Date().getTime();

    // Do not do computer move immediately, but wait for a small amount of time.
    setTimeout(() => {
        // only save new game if still on game view
        if (getView() === EView.GAME) {
            game = newGame;
            saveGame();
            onStateChange();
        }
    }, Math.max(computerTurnLength - (end - begin)), 1);
}

async function saveGame() {
    storage.write(storageKey, game);
}

async function removeGame() {
    storage.remove(storageKey);
}

async function loadGame() {
    const storedGame = await storage.read(storageKey);
    if (cclExt.isGame(storedGame)) {
        game = storedGame;
    }
}

// -----------------------------------------------------------------------------

// Load stored game the first time this file is retrieved.
loadGame().then(onStateChange).catch(e => console.log(e));