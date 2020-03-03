import { getSettings } from './controller/settings';

import { EColor, ERole } from 'chameleon-chess-logic';
import { ELanguage } from './models/language';
import { EPlayerType } from './models/players';

// -----------------------------------------------------------------------------

/** Hex codes of all colors used in the app. */
export function getColors() {
    return COLORS;
}

/** Source binaries of all images used in the app. */
export function getImages() {
    return IMAGES;
}

/** All texts displayed in the app in all available languages. The currently set
 * language is determined automatically. So the texts this function returns are
 * already in the correct language. */
export function getTexts() {
    return TEXTS[getSettings().language];
}

// -----------------------------------------------------------------------------

const COLORS = {
    basic: {
        black: '#000',
        grey:  '#888',
        white: '#fff',
    },
    main: {
        [EColor.RED]:   '#b9542d',
        [EColor.GREEN]: '#51a230',
        [EColor.YELLOW]:'#ddbb71',
        [EColor.BLUE]:  '#04909d',
    },
    shader: {
        darken: '#0008',
        greying: '#8888',
        lighten: '#fff8',
    },
};

const ASSETS_DIR = '../assets/';

const IMG_DIR = ASSETS_DIR + 'images/';

const IMAGES = {
    background: require(IMG_DIR + 'background-image.png'),
    home: require(IMG_DIR + 'home.png'),
    settings: require(IMG_DIR + 'settings.png'),
    playerTypes: {
        [EPlayerType.NONE]: require(IMG_DIR + 'none.png'),
        [EPlayerType.HUMAN]: require(IMG_DIR + 'human.png'),
        [EPlayerType.COMPUTER]: require(IMG_DIR + 'computer.png'),
    },
    roles: {
        [ERole.KNIGHT]: require(IMG_DIR + 'knight.png'),
        [ERole.QUEEN]: require(IMG_DIR + 'queen.png'),
        [ERole.BISHOP]: require(IMG_DIR + 'bishop.png'),
        [ERole.ROOK]: require(IMG_DIR + 'rook.png'),
    },
};

const TEXTS_DIR = ASSETS_DIR + 'texts/';

const TEXTS = {
    [ELanguage.ENGLISH]: mapTextFile(require(TEXTS_DIR + 'en' + '.json')),
    [ELanguage.GERMAN]: mapTextFile(require(TEXTS_DIR + 'de' + '.json')),
};

interface ITexts {
    logo: string,
    player: {[player in EColor]: string};
    playerType: {[playerType in EPlayerType]: string};
    home: {
        buttons: {
            continue: string;
            newGame: string;
            tutorial: string;
            settings: string;
        };
    };
    playerConfig: {
        heading: string;
        subText: string;
        button: string;
    };
    game: {
        winning: string;
        buttons: {
            home: string;
            newGame: string;
            replay: string;
        };
    };
    settings: {
        heading: string;
        sounds: string;
        music: string;
        language: string;
    };
}

function mapTextFile(file: any) {
    return <ITexts>{
        logo: file.logo,
        player: {
            [EColor.RED]: file.player.red,
            [EColor.GREEN]: file.player.green,
            [EColor.YELLOW]: file.player.yellow,
            [EColor.BLUE]: file.player.blue,
        },
        playerType: {
            [EPlayerType.NONE]: file.playerType.none,
            [EPlayerType.HUMAN]: file.playerType.human,
            [EPlayerType.COMPUTER]: file.playerType.computer,
        },
        home: file.home,
        playerConfig: file.playerConfig,
        game: file.game,
        settings: file.settings,
    };
}