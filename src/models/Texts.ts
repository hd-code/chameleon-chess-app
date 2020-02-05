import { EColor } from 'chameleon-chess-logic';

import AppState from '../AppState';

// -----------------------------------------------------------------------------

/** Enum specifying the supported languages. */
export enum ELanguage {
    ENGLISH = 'en',
    GERMAN  = 'de',
}

/** Returns all the different text phrases in the app according to the set language. */
export function getTexts() {
    return TEXTS[AppState.Settings.Language.get()];
}

// -----------------------------------------------------------------------------

const TEXTS = {

en: {
    players: {
        [EColor.RED]:    "Player Red",
        [EColor.GREEN]:  "Player Green",
        [EColor.YELLOW]: "Player Yellow",
        [EColor.BLUE]:   "Player Blue",
    },
    Game: {
        winner: {
            [EColor.RED]:    "Player Red won!",
            [EColor.GREEN]:  "Player Green won!",
            [EColor.YELLOW]: "Player Yellow won!",
            [EColor.BLUE]:   "Player Blue won!",
        },
        victoryPopup: {
            homeButton: "Home",
            replayButton: "Replay",
            newGame: "New Game",
        }
    },
    Home: {
        continue: "Continue",
        newGame: "New Game",
        tutorial: "Tutorial",
    },
    PlayerConfig: {
        heading: "Configure New Game",
        explanation: "Tab on a player to change the role.",
        beginGame: "Begin Game",
    },
},

de: {
    players: {
        [EColor.RED]:    "Spieler Rot",
        [EColor.GREEN]:  "Spieler Grün",
        [EColor.YELLOW]: "Spieler Gelb",
        [EColor.BLUE]:   "Spieler Blau"
    },
    Game: {
        winner: {
            [EColor.RED]:    "Spieler Rot hat gewonnen!",
            [EColor.GREEN]:  "Spieler Grün hat gewonnen!",
            [EColor.YELLOW]: "Spieler Gelb hat gewonnen!",
            [EColor.BLUE]:   "Spieler Blau hat gewonnen!",
        },
        victoryPopup: {
            homeButton: "Home",
            replayButton: "Nochmal",
            newGame: "Neues Spiel",
        }
    },
    Home: {
        continue: "Fortsetzen",
        newGame: "Neues Spiel",
        tutorial: "Tutorial",
    },
    PlayerConfig: {
        heading: "Neues Spiel konfigurieren",
        explanation: "Auf einen Spieler tippen, um die Rolle zu ändern.",
        beginGame: "Spiel starten",
    },
},

};