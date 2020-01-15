import Color from "../assets/colors.json";
import Texts  from "../assets/texts.json";

import { EColor } from "chameleon-chess-logic";
import { Language } from "./storage";

/* --------------------------------- Colors --------------------------------- */

export const Colors = {
    basic: Color.basic,
    button: Color.button,
    main: {
        [EColor.RED]: Color.main.red,
        [EColor.GREEN]: Color.main.green,
        [EColor.YELLOW]: Color.main.yellow,
        [EColor.BLUE]: Color.main.blue,
    },
    shader: Color.shader,
}

/* --------------------------------- Images --------------------------------- */

const assets = '../assets/'
export const Images = {
    AI: require(assets + 'AI.png'),
    Bishop: require(assets + 'Bishop.png'),
    Home: require(assets + 'Home.png'),
    Human: require(assets + 'Human.png'),
    Knight: require(assets + 'Knight.png'),
    Logo: require(assets + 'Logo.png'),
    NoPlayer: require(assets + 'NoPlayer.png'),
    Queen: require(assets + 'Queen.png'),
    Rook: require(assets + 'Rook.png'),
}

/* --------------------------------- Texts ---------------------------------- */

export function getTexts() {
    const T = Texts[Language.get()]
    return {
        players: {
            [EColor.RED]: T.players.red,
            [EColor.GREEN]: T.players.green,
            [EColor.YELLOW]: T.players.yellow,
            [EColor.BLUE]: T.players.blue,
        },
        Home: T.Home,
        PlayerConfig: T.PlayerConfig
    }
}