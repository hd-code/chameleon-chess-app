import { isString, isNumber } from "./helper";

export enum ELanguage {
    GERMAN  = 'de',
    ENGLISH = 'en'
}
export function isELanguage(x: any): x is ELanguage {
    return isString(x) && x in ELanguage
}

export enum EColorScheme { NORMAL, ACCESSIBLE }
export function isEColorScheme(x:any): x is EColorScheme {
    return isNumber(x) && EColorScheme[x] !== undefined
}