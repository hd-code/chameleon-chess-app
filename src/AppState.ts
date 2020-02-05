import Storage from './Storage';

import { EColorScheme } from './models/Colors';
import { IGame } from './models/Game';
import { ELanguage } from './models/Texts';
import { EView } from './models/View';

// -----------------------------------------------------------------------------

/** Interface for a global variable. This variable stores important data and
 * settings needed in the app. Through this interface, the values in the
 * variable can be accessed. The variable is stored to a persistent local
 * storage and retrieved on startup of the app. This happens automatically. */
export const AppState = {

    /** The data of the game that is currently played. */
    Game: <IStateObjectExt<IGame|null>>{
        get: () => CACHE.Game,
        set: (game) => {
            CACHE.Game = game;
            Storage.write(EStorageKey.GAME, game);
        },
        rmv: () => {
            CACHE.Game = null;
            Storage.remove(EStorageKey.GAME);
        }
    },

    /** Holds app settings. */
    Settings: {
        ColorScheme: <IStateObject<EColorScheme>>{
            get: () => CACHE.Settings.ColorScheme,
            set: (colorScheme) => {
                CACHE.Settings.ColorScheme = colorScheme;
                Storage.write(EStorageKey.COLOR, colorScheme);
            },
        },
        Language:    <IStateObject<ELanguage>>{
            get: () => CACHE.Settings.Language,
            set: (language) => {
                CACHE.Settings.Language = language;
                console.log(CACHE.Settings.Language);
                Storage.write(EStorageKey.LANGUAGE, language);
            },
        },
    },

    /** Holds the currently visible view. */
    View: <IStateObject<EView>>{
        get: () => CACHE.View,
        set: (view) => { CACHE.View = view; },
    },
};

export default AppState;

// -----------------------------------------------------------------------------

enum EStorageKey { GAME = 'game', COLOR = 'color', LANGUAGE = 'lang' }

interface IStateObject<T> {
    get: () => T;
    set: (object: T) => void;
}

interface IStateObjectExt<T> extends IStateObject<T> {
    rmv: () => void;
}

type AppStateCache = {
    Game: IGame|null;
    Settings: {
        ColorScheme: EColorScheme;
        Language:    ELanguage;
    };
    View: EView;
}

// var CACHE: AppStateCache = {
//     Game: null,
//     View: EView.HOME,
//     Settings: {
//         ColorScheme: EColorScheme.NORMAL,
//         Language: ELanguage.ENGLISH
//     }
// }

var CACHE: AppStateCache = {
    Game: {
        players: { 0:1, 1:0, 2:1, 3:0 },
        gs: {
            "limits": {"lower":{"row":0,"col":0},"upper":{"row":7,"col":7}},
            "pawns":[
                {"player":0,"roles":{"0":0,"1":1,"2":2,"3":3},"position":{"row":7,"col":0}},
                // {"player":0,"roles":{"0":3,"1":0,"2":1,"3":2},"position":{"row":7,"col":1}},
                // {"player":0,"roles":{"0":2,"1":3,"2":0,"3":1},"position":{"row":7,"col":2}},
                // {"player":0,"roles":{"0":1,"1":2,"2":3,"3":0},"position":{"row":7,"col":3}},
                {"player":2,"roles":{"0":2,"1":3,"2":0,"3":1},"position":{"row":0,"col":7}},
                // {"player":2,"roles":{"0":1,"1":2,"2":3,"3":0},"position":{"row":0,"col":6}},
                // {"player":2,"roles":{"0":0,"1":1,"2":2,"3":3},"position":{"row":0,"col":5}},
                // {"player":2,"roles":{"0":3,"1":0,"2":1,"3":2},"position":{"row":0,"col":4}}
            ],
            "whoseTurn":0
        },
        selectedPawn: null
    },
    View: EView.HOME,
    Settings: {
        ColorScheme: EColorScheme.NORMAL,
        Language: ELanguage.GERMAN
    }
}

// initAppState().then(result => CACHE = result).catch(err => console.log(err));

async function initAppState(): Promise<AppStateCache> {
    return {
        Game: await Storage.read(EStorageKey.GAME),
        Settings: {
            ColorScheme: await Storage.read(EStorageKey.COLOR)    || EColorScheme.NORMAL,
            Language:    await Storage.read(EStorageKey.LANGUAGE) || ELanguage.GERMAN
        },
        View: EView.HOME,
    }
}