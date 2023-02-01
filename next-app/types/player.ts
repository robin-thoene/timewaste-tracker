/**
 * Represents a single player to collect data for.
 */
interface IPlayer {
    /** The players internal id. */
    id: string;
    /** The steam id. */
    steamId: string;
    /** The name to display for the player. */
    displayName: string;
}

export type { IPlayer };
