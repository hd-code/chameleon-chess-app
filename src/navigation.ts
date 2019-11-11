export enum EViews { HOME, PLAYER_CONFIG, GAME }

export interface INavs {
    home:         () => void
    game:         () => void
    playerConfig: () => void
    rerender:     () => void
}

export interface ViewProps {
    navigate: INavs
}