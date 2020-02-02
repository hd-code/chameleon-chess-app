import { EColor } from 'chameleon-chess-logic';

import AppState from '../AppState';

// -----------------------------------------------------------------------------

export enum ELanguage {
    ENGLISH = 'en',
    GERMAN  = 'de',
}

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