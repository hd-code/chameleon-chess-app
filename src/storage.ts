import AsyncStorage from "@react-native-community/async-storage";
import { IGame, ELanguage, EColorScheme } from "./types";

/* ------------------------------ Storage Keys ------------------------------ */

enum EStorageKey { 
    GAME  = 'game',
    LANG  = 'lang',
    COLOR = 'color',
}

/* -------------------------- Local Cache Variable -------------------------- */

const DEFAULT_LANGUAGE = ELanguage.GERMAN
const DEFAULT_COLOR_SCHEME = EColorScheme.NORMAL

interface IStoredObjects {
    [EStorageKey.GAME]:  IGame|null
    [EStorageKey.LANG]:  ELanguage
    [EStorageKey.COLOR]: EColorScheme
}

let CACHE: IStoredObjects = {
    [EStorageKey.GAME]:  null,
    [EStorageKey.LANG]:  DEFAULT_LANGUAGE,
    [EStorageKey.COLOR]: DEFAULT_COLOR_SCHEME
}

/* ------ Methods for getting, setting and removing entries in storage ------ */

interface IStoredObjectMethods<T> {
    get: () => T
    set: (object: T) => void
}

interface IStoredObjectMethodsExt<T> extends IStoredObjectMethods<T> {
    rmv: () => void
}

export const Game: IStoredObjectMethodsExt<IGame|null> = {
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

async function readFromStorage<T>(entry: EStorageKey): Promise<T|null> {
    const data = await AsyncStorage.getItem(entry)
    return JSON.parse(data || 'null')
}

async function writeToStorage<T>(entry: EStorageKey, data: T) {
    const storableData = JSON.stringify(data)
    AsyncStorage.setItem(entry, storableData)
}

async function removeFromStorage(entry: EStorageKey) {
    AsyncStorage.removeItem(entry)
}