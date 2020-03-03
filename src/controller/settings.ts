import { onStateChange } from '../App';
import storage from '../storage';

import { ELanguage } from '../models/language';
import { ISettings, isSettings, IChangeSettings } from '../models/settings';

// -----------------------------------------------------------------------------

/** Returns the current settings. */
export function getSettings() {
    return settings;
}

/** Returns the functions to alter the settings. */
export function getSettingsChanger() {
    return settingsChanger;
}

// -----------------------------------------------------------------------------

const storageKey = 'settings';

let settings: ISettings = {
    language: ELanguage.GERMAN,
    musicOn: true,
    soundOn: true,
};

const settingsChanger: IChangeSettings = {
    setLanguage: (newLang: ELanguage) => {
        settings.language = newLang;
        onStateChange();
        saveSettings();
    },
    toggleMusicOn: () => {
        settings.musicOn = !settings.musicOn;
        onStateChange();
        saveSettings();
    },
    toggleSoundOn: () => {
        settings.soundOn = !settings.soundOn;
        onStateChange();
        saveSettings();
    },
};

async function saveSettings() {
    await storage.write(storageKey, settings);
}

async function loadSettings() {
    const storedSettings = await storage.read(storageKey);

    if (isSettings(storedSettings)) {
        settings = storedSettings;
    } else {
        // Save default settings if none were available.
        saveSettings();
    }
}

// -----------------------------------------------------------------------------

// Load settings the first time this file is retrieved.
loadSettings().then(onStateChange).catch(e => console.log(e));