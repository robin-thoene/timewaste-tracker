/**
 * Represents a single game's playtime.
 */
interface IGameTime {
    /** The game's name. */
    gameName: string;
    /** Playtime of the game in hours. */
    playtimeInHours: number;
}

export type { IGameTime };
