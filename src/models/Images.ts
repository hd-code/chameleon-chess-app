import AppState from '../AppState';

import { ELanguage } from './Texts';

// -----------------------------------------------------------------------------

/** Returns all images with their corresponding data available in this app. */
export function getImages() {
    return {...IMAGES, ...LANG_IMAGES[AppState.Settings.Language.get()]};
}

// -----------------------------------------------------------------------------

const assets = '../../assets/';
const IMAGES = {
    AI:       require(assets + 'AI.png'),
    Bishop:   require(assets + 'Bishop.png'),
    Home:     require(assets + 'Home.png'),
    Human:    require(assets + 'Human.png'),
    Knight:   require(assets + 'Knight.png'),
    NoPlayer: require(assets + 'NoPlayer.png'),
    Queen:    require(assets + 'Queen.png'),
    Rook:     require(assets + 'Rook.png'),
    Settings: require(assets + 'Settings.png'),
};

const LANG_IMAGES = {
    [ELanguage.ENGLISH]: {
        Logo:     require(assets + 'Logo-en.png'),
    },
    [ELanguage.GERMAN]: {
        Logo:     require(assets + 'Logo-de.png'),
    },
}