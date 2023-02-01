import { ISteamPlayerGame } from './steamPlayerGame';

/**
 * Represents the response from a call to the getRecentlyPlayedGames steam endpoint.
 */
interface ISteamGetRecentlyPlayedGamesResponse {
    response: {
        total_count: number;
        games: ISteamPlayerGame[];
    };
}

export type { ISteamGetRecentlyPlayedGamesResponse };
