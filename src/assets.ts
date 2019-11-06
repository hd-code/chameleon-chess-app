import Color from "../assets/colors.json";
import Text  from "../assets/texts.json";

import { EColor } from "chameleon-chess-logic";

/* --------------------------------- Colors --------------------------------- */

export const Colors = {
    main: {
        [EColor.RED]: Color.main.red,
        [EColor.GREEN]: Color.main.green,
        [EColor.YELLOW]: Color.main.yellow,
        [EColor.BLUE]: Color.main.blue,
    },
    button: Color.button,
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

export const Texts = {
    players: {
        [EColor.RED]: Text.players.red,
        [EColor.GREEN]: Text.players.green,
        [EColor.YELLOW]: Text.players.yellow,
        [EColor.BLUE]: Text.players.blue,
    },
    Home: Text.Home,
    PlayerConfig: Text.PlayerConfig
}