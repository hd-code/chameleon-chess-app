import { Platform, UIManager } from 'react-native';

import storage from '../storage';

import { loadGame } from './game';

import { ELanguage } from '../models/language';
import { ISettings, isSettings } from '../models/settings';
import { EView } from '../models/view';

// -----------------------------------------------------------------------------

/** Subscribe to a change in the app state. The passed callback function will be
 * called if the state is changed. Only one subscriber is allowed as only the
 * current instance of App.tsx should use this function. When this function is
 * called, any previous subscriptions are canceled. */
export function subscribe(callback: () => void) {
    subscription = callback;
}

/** Get the current view to be displayed. */
export function getView() {
    return view;
}

/** Namespace: Go to another view. */
export const goto = {
    /** Go to Home view. */
    home: () => {
        view = EView.HOME;
        notify();
    },
    /** Go to PlayerConfig view. */
    playerConfig: () => {
        view = EView.PLAYER_CONFIG;
        notify();
    },
    /** Go to Game view. */
    game: () => {
        view = EView.GAME;
        notify();
    },
    /** Go to Settings view. */
    settings: () => {

        // FIXME: Android Layout Animation Bug
        // disable layout animation as it throws an exception for an unknown reason
        // layout animation is reactivated, once the component loaded successfully.
        // See fixme statement in the component for further information.
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(false);
            }
        }
        // -----------------------------------

        view = EView.SETTINGS;
        notify();
    }
};

/** Get the currently set language. */
export function getLanguage() {
    return settings.language;
}

/** Set the current language. */
export function setLanguage(lang: ELanguage) {
    settings.language = lang;
    saveSettings();
    notify();
}

/** Returns true if music should play. */
export function isMusicOn() {
    return settings.musicOn;
}

/** Toggles wether music should be playing or not. */
export function toggleMusicOn() {
    settings.musicOn = !settings.musicOn;
    saveSettings();
    notify();
}

/** Returns true if sound should be played. */
export function isSoundOn() {
    return settings.soundOn;
}

/** Toggles wether sounds should be played or not. */
export function toggleSoundOn() {
    settings.soundOn = !settings.soundOn;
    saveSettings();
    notify();
}

// -----------------------------------------------------------------------------

const STORAGE_KEY = 'storage';

let subscription: (() => void);

let view = EView.HOME;

/** Settings with default values. */
let settings: ISettings = {
    language: ELanguage.GERMAN,
    musicOn: true,
    soundOn: true,
}

/** Call the callback function a subscriber has registered to beforehand. */
function notify() {
    subscription && subscription();
}

/** Saves the current settings to local storage. */
async function saveSettings() {
    storage.write(STORAGE_KEY, settings);
}

/** Loads the settings from local storage. If there are none or if they are not
 * valid, the default settings will be stored instead. */
async function loadSettings() {
    let storedSettings = await storage.read(STORAGE_KEY);

    if (isSettings(storedSettings)) {
        settings = storedSettings;
    } else {
        saveSettings();
    }
}

/** Load all stored data from local storage and save to local variables. */
async function initApp() {
    await loadSettings();
    await loadGame();
    notify();
}

// -----------------------------------------------------------------------------

// storage is loaded the first time this module is referenced
initApp().then(() => {console.log('storage loaded')}).catch(e => console.error(e));