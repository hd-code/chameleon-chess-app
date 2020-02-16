// -----------------------------------------------------------------------------

/** Returns all images with their corresponding data available in this app. */
export function getImages() {
    return IMAGES;
}

// -----------------------------------------------------------------------------

const assets = '../../assets/images/';
const IMAGES = {
    BackgroundImage: require(assets + 'background-image.png'),
    AI:       require(assets + 'computer.png'),
    Human:    require(assets + 'human.png'),
    NoPlayer: require(assets + 'none.png'),
    Knight:   require(assets + 'knight.png'),
    Queen:    require(assets + 'queen.png'),
    Bishop:   require(assets + 'bishop.png'),
    Rook:     require(assets + 'rook.png'),
    Home:     require(assets + 'home-colored.png'),
    Settings: require(assets + 'settings-colored.png'),
};