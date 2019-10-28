import AsyncStorage from "@react-native-community/async-storage";
import { IGameState } from "chameleon-chess-logic";
import { ELanguage, isELanguage, EColorScheme, isEColorScheme } from "./types";

enum StoredObjects { 
    GAME         = 'game',
    LANGUAGE     = 'lang',
    COLOR_SCHEME = 'color',
}

interface StorageObject<T> {
    get: () => Promise<T>
    set: (object: T) => void
}

export const Game: StorageObject<IGameState> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.GAME)
        return <IGameState>JSON.parse(data || '')
    },
    set: (gs: IGameState) => {
        const data = JSON.stringify(gs)
        AsyncStorage.setItem(StoredObjects.GAME, data)
    }
}

export const Language: StorageObject<ELanguage> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.LANGUAGE)
        return (isELanguage(data) ? data : ELanguage.ENGLISH)
    },
    set: (lang: ELanguage) => {
        AsyncStorage.setItem(StoredObjects.LANGUAGE, lang)
    }
}

export const Color: StorageObject<EColorScheme> = {
    get: async () => {
        const data = await AsyncStorage.getItem(StoredObjects.COLOR_SCHEME)
        const parsed = parseInt(data || '')
        return isEColorScheme(parsed) ? parsed : EColorScheme.NORMAL 
    },
    set: (colorScheme: EColorScheme) => {
        AsyncStorage.setItem(StoredObjects.COLOR_SCHEME, colorScheme + '')
    }
}