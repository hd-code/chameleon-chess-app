import Color from "../assets/colors.json";
import Text  from "../assets/texts.json";
import { EColor } from "chameleon-chess-logic";

export const Colors = {
    main: {
        [EColor.RED]: Color.main.red,
        [EColor.GREEN]: Color.main.green,
        [EColor.YELLOW]: Color.main.yellow,
        [EColor.BLUE]: Color.main.blue,
    },
    shader: Color.shader,
}

const assets = '../assets/'
export const Images = {
    AI: require(assets + 'AI.png'),
    Bishop: require(assets + 'Bishop.png'),
    Human: require(assets + 'Human.png'),
    Knight: require(assets + 'Knight.png'),
    NoPlayer: require(assets + 'NoPlayer.png'),
    Queen: require(assets + 'Queen.png'),
    Rook: require(assets + 'Rook.png'),
}

export const Texts = {
    players: {
        [EColor.RED]: Text.players.red,
        [EColor.GREEN]: Text.players.green,
        [EColor.YELLOW]: Text.players.yellow,
        [EColor.BLUE]: Text.players.blue,
    }
}