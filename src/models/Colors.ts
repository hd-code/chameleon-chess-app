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
        darken:  "#0008",
        lighten: "#fff8",
        greyOut: "#8888",
    }
};