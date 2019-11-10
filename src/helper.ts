/** creates clone of passed object. attention: removes contained functions! */
export function deepClone<T>(original: T): T {
    return JSON.parse(JSON.stringify(original))
}

export function flattenArray<T>(original: T[][]): T[] {
    return original.reduce((result, item) => result.concat(item), [])
}

/** 
 * Rounds a number to the desired precision.
 * @param number    The number to be rounded
 * @param precision The number of digits after comma. 
 *      Positive numbers will round after comma, thus making it more precise.
 *      Negative numbers will round before the comma, thus lessening the precision.
 */
export function round(num: number, precision: number): number {
    let factor = 10 ** precision
    return Math.round(num * factor) / factor
}

export function getUnixTimestamp(): number {
    return Math.round((new Date()).getTime() / 1000)
}

/* ----------------------------- Type Checking ------------------------------ */

export function isNumber(n:any): n is number {
    return typeof n === 'number'
}

export function isString(s:any): s is string {
    return typeof s === 'string'
}

export function isBool(b:any): b is boolean {
    return typeof b === 'boolean'
}

/** checks if an object a is an array of the type specified by the type guard */
export function isArrayOf<T>(a: any, typeGuard: (e:any) => e is T): a is T[] {
    return Array.isArray(a) && a.length === a.filter(b => typeGuard(b)).length
}