/**
 * Model for the recent playtime of one player.
 */
interface IRecentPlayerPlaytime {
    /** The players display name. */
    playerDisplayName: string;
    /** The players most recent playtime in hours. */
    recentPlaytimeInHours: number;
}

export type { IRecentPlayerPlaytime };
