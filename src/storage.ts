import AsyncStorage from "@react-native-community/async-storage";
import { IGame, ELanguage, EColorScheme } from "./types";

/* ------------------------------ Storage Keys ------------------------------ */

enum EStorageKey { 
    GAME  = 'game',
    LANG  = 'lang',
    COLOR = 'color',
}

/* -------------------------- Local Cache Variable -------------------------- */

interface IStoredObjects {
    [EStorageKey.GAME]:  IGame|null
    [EStorageKey.LANG]:  ELanguage
    [EStorageKey.COLOR]: EColorScheme
}

const DEFAULT_LANGUAGE = ELanguage.GERMAN
const DEFAULT_COLOR_SCHEME = EColorScheme.NORMAL

let CACHE: IStoredObjects = {
    [EStorageKey.GAME]:  null,
    [EStorageKey.LANG]:  DEFAULT_LANGUAGE,
    [EStorageKey.COLOR]: DEFAULT_COLOR_SCHEME
}

/* ------ Methods for getting, setting and removing entries in storage ------ */

interface IStoredObjectMethods<T> {
    get: () => T
    set: (object: T) => void
    rmv?: () => void
}

export const Game: IStoredObjectMethods<IGame|null> = {
    get: () => CACHE[EStorageKey.GAME],
    set: (gameData) => {
        CACHE[EStorageKey.GAME] = gameData
        writeToStorage(EStorageKey.GAME, gameData)
    },
    rmv: () => {
        CACHE[EStorageKey.GAME] = null
        removeFromStorage(EStorageKey.GAME)
    }
}

export const Language: IStoredObjectMethods<ELanguage> = {
    get: () => CACHE[EStorageKey.LANG],
    set: (language) => {
        CACHE[EStorageKey.LANG] = language
        writeToStorage(EStorageKey.LANG, language)
    }
}

export const Color: IStoredObjectMethods<EColorScheme> = {
    get: () => CACHE[EStorageKey.COLOR],
    set: (colorScheme) => {
        CACHE[EStorageKey.COLOR] = colorScheme
        writeToStorage(EStorageKey.COLOR, colorScheme)
    }
}

/* ------------------------ Initialization Functions ------------------------ */

export async function initCache() {
    await initGame()
    await initLang()
    await initColor()
}

async function initGame() {
    const data = await readFromStorage<IGame>(EStorageKey.GAME)
    CACHE[EStorageKey.GAME] = data
}
async function initLang() {
    const data = await readFromStorage<ELanguage>(EStorageKey.LANG)
    if (data === null) {
        writeToStorage(EStorageKey.LANG, CACHE[EStorageKey.LANG])
    } else {
        CACHE[EStorageKey.LANG] = data
    }
}
async function initColor() {
    const data = await readFromStorage<EColorScheme>(EStorageKey.COLOR)
    if (data === null) {
        writeToStorage(EStorageKey.COLOR, CACHE[EStorageKey.COLOR])
    } else {
        CACHE[EStorageKey.COLOR] = data
    }
}

/* --------------------- Generic AsyncStorage Functions --------------------- */

function readFromStorage<T>(entry: EStorageKey): Promise<T|null> {
    return AsyncStorage.getItem(entry).then((data) => {
        return JSON.parse(data || 'null')
    })
}

function writeToStorage<T>(entry: EStorageKey, data: T): Promise<void> {
    const storableData = JSON.stringify(data)
    return AsyncStorage.setItem(entry, storableData)
}

function removeFromStorage(entry: EStorageKey): Promise<void> {
    return AsyncStorage.removeItem(entry)
}