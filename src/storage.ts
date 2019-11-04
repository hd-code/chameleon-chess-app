import AsyncStorage from "@react-native-community/async-storage";
import { IGame, ELanguage, isELanguage, EColorScheme, isColorScheme } from "./types";

enum StoredObjects { 
    GAME         = 'game',
    LANGUAGE     = 'lang',
    COLOR_SCHEME = 'color',
}

interface StorageObject<T> {
    get: () => Promise<T>
    set: (object: T) => void
    rmv: () => void
}

export const Game: StorageObject<IGame|undefined> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.GAME)
        return data ? <IGame>JSON.parse(data) : undefined
    },
    set: (gs) => {
        if (!gs) return
        const data = JSON.stringify(gs)
        AsyncStorage.setItem(StoredObjects.GAME, data)
    },
    rmv: () => {
        AsyncStorage.removeItem(StoredObjects.GAME)
    }
}

export const Language: StorageObject<ELanguage> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.LANGUAGE)
        return (isELanguage(data) ? data : ELanguage.ENGLISH)
    },
    set: (lang) => {
        AsyncStorage.setItem(StoredObjects.LANGUAGE, lang)
    },
    rmv: () => {
        AsyncStorage.removeItem(StoredObjects.LANGUAGE)
    }
}

export const Color: StorageObject<EColorScheme> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.COLOR_SCHEME)
        const parsed = parseInt(data || '')
        return isColorScheme(parsed) ? parsed : EColorScheme.NORMAL 
    },
    set: (colorScheme) => {
        AsyncStorage.setItem(StoredObjects.COLOR_SCHEME, colorScheme + '')
    },
    rmv: () => {
        AsyncStorage.removeItem(StoredObjects.COLOR_SCHEME)
    }
}