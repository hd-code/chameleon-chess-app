import { isNumber } from '../../lib/hd-helper';

// -----------------------------------------------------------------------------

export enum EColorScheme { NORMAL, ACCESSIBLE }

export function isColorScheme(x:any): x is EColorScheme {
    return isNumber(x) && EColorScheme[x] !== undefined;
}