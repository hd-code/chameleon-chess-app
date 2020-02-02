import { isString } from '../../lib/hd-helper';

// -----------------------------------------------------------------------------

export enum ELanguage {
    GERMAN  = 'de',
    ENGLISH = 'en'
}

export function isELanguage(x: any): x is ELanguage {
    return isString(x) && x in ELanguage;
}