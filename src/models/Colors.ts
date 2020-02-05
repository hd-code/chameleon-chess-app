import { EColor } from 'chameleon-chess-logic';

// -----------------------------------------------------------------------------

export enum EColorScheme { NORMAL, ACCESSIBLE }

export function getColors() {
    return NORMAL;
}

// -----------------------------------------------------------------------------

const NORMAL = {
    basic: {
        background: "#efe",
        text: "#121",
        black: "#000",
        white: "#fff",
    },
    button: {
        background: "#51A230",
        text: "#fff",
    },
    main: {
        [EColor.RED]:    "#B9542D",
        [EColor.GREEN]:  "#51A230",
        [EColor.YELLOW]: "#DDBB71",
        [EColor.BLUE]:   "#04909D",
    },
    shader: {
        darker:  "#0008",
        dark:    "#0004",
        greyOut: "#8888",
        light:   "#fff4",
        lighter: "#fff8",
    }
};