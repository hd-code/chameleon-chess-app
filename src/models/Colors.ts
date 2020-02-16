import { EColor } from 'chameleon-chess-logic';

// -----------------------------------------------------------------------------

export function getColors() {
    return COLORS;
}

// -----------------------------------------------------------------------------

const COLORS = {
    main: {
        [EColor.RED]:    '#B9542D',
        [EColor.GREEN]:  '#51A230',
        [EColor.YELLOW]: '#DDBB71',
        [EColor.BLUE]:   '#04909D',
    },
    basic: {
        black: '#000',
        white: '#fff',
    }
};