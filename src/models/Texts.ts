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
        [EColor.BLUE]:   "Player Blue"
    },
    Home: {
        continue: "Continue",
        newGame: "New Game",
        tutorial: "Tutorial"
    },
    PlayerConfig: {
        beginGame: "Begin Game"
    }
},

de: {
    players: {
        [EColor.RED]:    "Spieler Rot",
        [EColor.GREEN]:  "Spieler Grün",
        [EColor.YELLOW]: "Spieler Gelb",
        [EColor.BLUE]:   "Spieler Blau"
    },
    Home: {
        continue: "Fortsetzen",
        newGame: "Neues Spiel",
        tutorial: "Tutorial"
    },
    PlayerConfig: {
        beginGame: "Spiel starten"
    }
},

};