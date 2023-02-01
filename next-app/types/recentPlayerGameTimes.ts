import { IGameTime } from './gameTime';

/**
 * Represents a single player's recent game times.
 */
interface IRecentPlayerGameTimes {
    /** The players display name. */
    playerDisplayName: string;
    /** The game times. */
    gameTimes: IGameTime[];
}

export type { IRecentPlayerGameTimes };
