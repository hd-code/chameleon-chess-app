export enum EViews { HOME, PLAYER_CONFIG, GAME }

export interface IViews {
    home: () => void
    game: () => void
    playerConfig: () => void
}

export interface ViewProps {
    navigate: IViews
}