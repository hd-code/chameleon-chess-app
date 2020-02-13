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
    AI:       require(assets + 'computer.png'),
    Bishop:   require(assets + 'bishop.png'),
    Home:     require(assets + 'home.png'),
    Human:    require(assets + 'human.png'),
    Knight:   require(assets + 'knight.png'),
    NoPlayer: require(assets + 'none.png'),
    Queen:    require(assets + 'queen.png'),
    Rook:     require(assets + 'rook.png'),
    Settings: require(assets + 'settings.png'),
};

const LANG_IMAGES = {
    [ELanguage.ENGLISH]: {
        Logo:     require(assets + 'logo-en.png'),
    },
    [ELanguage.GERMAN]: {
        Logo:     require(assets + 'logo-de.png'),
    },
}