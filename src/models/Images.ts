
// -----------------------------------------------------------------------------

export function getImages() {
    return IMAGES;
}

// -----------------------------------------------------------------------------

const assets = '../../assets/';
const IMAGES = {
    AI: require(assets + 'AI.png'),
    Bishop: require(assets + 'Bishop.png'),
    Home: require(assets + 'Home.png'),
    Human: require(assets + 'Human.png'),
    Knight: require(assets + 'Knight.png'),
    Logo: require(assets + 'Logo.png'),
    NoPlayer: require(assets + 'NoPlayer.png'),
    Queen: require(assets + 'Queen.png'),
    Rook: require(assets + 'Rook.png'),
};