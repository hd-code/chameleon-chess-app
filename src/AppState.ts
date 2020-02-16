import Storage from './Storage';

// import { EColorScheme } from './models/Colors';
import { IGame } from './models/Game';
import { ELanguage } from './models/Language';
import { EView } from './models/View';

// -----------------------------------------------------------------------------

/** Interface for a global variable. This variable stores important data and
 * settings needed in the app. Through this interface, the values in the
 * variable can be accessed. The variable is stored to a persistent local
 * storage and retrieved on startup of the app. This happens automatically. */
const AppState = {
    
    /** Subscribe to any changes in the app state. Pass a callback function as a
     * paramter. Once the state changes, the registered callback function is
     * called. The subscription is only fired once. */
    subscribeOnce: (callback: () => void) => {
        subscribersOnce.push(callback);
    },

    /** The data of the game that is currently played. */
    Game: <IStateObjectExt<IGame|null>>{
        get: () => cache.Game,
        set: (game) => {
            cache.Game = game;
            Storage.write(EStorageKey.GAME, game);
            notifySubscribers();
        },
        rmv: () => {
            cache.Game = null;
            Storage.remove(EStorageKey.GAME);
        },
    },

    /** Holds app settings. */
    Settings: {
        // ColorScheme: <IStateObject<EColorScheme>>{
        //     get: () => CACHE.Settings.ColorScheme,
        //     set: (colorScheme) => {
        //         CACHE.Settings.ColorScheme = colorScheme;
        //         Storage.write(EStorageKey.COLOR, colorScheme);
        //     },
        // },
        Language:    <IStateObject<ELanguage>>{
            get: () => cache.Settings.Language,
            set: (language) => {
                cache.Settings.Language = language;
                Storage.write(EStorageKey.LANGUAGE, language);
                notifySubscribers();
            },
        },
    },

    /** Holds the currently visible view. */
    View: <IStateObject<EView>>{
        get: () => cache.View,
        set: (view) => {
            cache.View = view;
            notifySubscribers();
        },
    },
};

export default AppState;

// -----------------------------------------------------------------------------

let subscribersOnce: (() => void)[] = [];

function notifySubscribers() {
    subscribersOnce.forEach(callback => callback());
    subscribersOnce = [];
}

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
        // ColorScheme: EColorScheme;
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

var cache: AppStateCache = {
    Game: {
        players: { 0:1, 1:0, 2:1, 3:0 },
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
        "whoseTurn":0,
        selectedPawn: null
    },
    View: EView.PLAYER_CONFIG,
    Settings: {
        // ColorScheme: EColorScheme.NORMAL,
        Language: ELanguage.GERMAN
    }
}

// initAppState().then(result => CACHE = result).catch(err => console.log(err));

async function initAppState(): Promise<AppStateCache> {
    return {
        Game: await Storage.read(EStorageKey.GAME),
        Settings: {
            // ColorScheme: await Storage.read(EStorageKey.COLOR)    || EColorScheme.NORMAL,
            Language:    await Storage.read(EStorageKey.LANGUAGE) || ELanguage.GERMAN
        },
        View: EView.HOME,
    }
}