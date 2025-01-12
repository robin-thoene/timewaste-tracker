import { IGameTime, IPlayer, IRecentPlayerGameTimes, IRecentPlayerPlaytime, ISteamGetRecentlyPlayedGamesResponse } from '../types';

// Convert the JSON to an array of players.
const allPlayers = process.env.PLAYERS_JSON ? (JSON.parse(process.env.PLAYERS_JSON) as IPlayer[]) : [];

// The base URL of the steam API.
const steamApiBaseUrl = 'https://api.steampowered.com';
// The relative URL of the endpoint to retrieve the recently played games.
const recentlyPlayedGamesUrl = 'IPlayerService/GetRecentlyPlayedGames';
// The API key to use for the steam API.
const steamApiKey = process.env.STEAM_API_KEY;

if (!steamApiKey) {
    throw new Error('No steam API key provided.');
}

/**
 * Fetch the steam API list to check if the used API key is valid and can
 * be used to access the steam web API.
 * @returns {Promise<boolean>} True if the key is valid, false if not.
 */
const checkApiKey = async (): Promise<boolean> => {
    const url = `${steamApiBaseUrl}/ISteamWebAPIUtil/GetSupportedAPIList/v1/?key=${steamApiKey}`;
    const response = await fetch(url);
    return response.ok;
};

/**
 * Retrieve the recently playtime for a player.
 * @param {string} playerId The unique identifier of the player in steam.
 * @returns {IRecentPlayerPlaytime} The recent playtime of the requested player.
 */
const getRecentPlaytime = async (playerId: string): Promise<IRecentPlayerPlaytime> => {
    const response = await fetch(`${steamApiBaseUrl}/${recentlyPlayedGamesUrl}/v1/?key=${steamApiKey}&steamid=${playerId}`);
    const data = (await response.json()) as ISteamGetRecentlyPlayedGamesResponse;
    let playtime = 0;
    data.response.games?.forEach((game) => {
        playtime += game.playtime_2weeks;
    });
    const result: IRecentPlayerPlaytime = {
        playerDisplayName: allPlayers.find((player) => player.steamId === playerId)?.displayName ?? 'Unknown',
        recentPlaytimeInHours: playtime / 60,
    };
    return result;
};

/**
 * Retrieve the recently played games and their playtime for a player.
 * @param {string} playerId The unique identifier of the player in steam.
 * @returns {IRecentPlayerGameTimes} The recently played games and their playtime of the requested player.
 */
const getRecentGamePlaytimes = async (playerId: string): Promise<IRecentPlayerGameTimes> => {
    const response = await fetch(`${steamApiBaseUrl}/${recentlyPlayedGamesUrl}/v1/?key=${steamApiKey}&steamid=${playerId}`);
    const data = (await response.json()) as ISteamGetRecentlyPlayedGamesResponse;
    const gameTimes = data.response.games?.map((game) => {
        const gameTime: IGameTime = {
            gameName: game.name,
            playtimeInHours: game.playtime_2weeks / 60,
        };
        return gameTime;
    });
    const result: IRecentPlayerGameTimes = {
        playerDisplayName: allPlayers.find((player) => player.steamId === playerId)?.displayName ?? 'Unknown',
        gameTimes: gameTimes,
    };
    return result;
};

/**
 * Get the list of all currently valid players.
 * @returns {IPlayer[]} The list of all currently valid players.
 */
const getValidPlayers = async (): Promise<IPlayer[]> => {
    const validPlayers: IPlayer[] = [];
    const validationPromises: Promise<number | void>[] = [];
    allPlayers.forEach((player) => {
        const steamLevelPromise = fetch(`${steamApiBaseUrl}/${recentlyPlayedGamesUrl}/v1/?key=${steamApiKey}&steamid=${player.steamId}`)
            .then((status) => {
                if (status.status === 200) {
                    validPlayers.push(player);
                }
            })
            .catch((error) => console.error(error));
        validationPromises.push(steamLevelPromise);
    });
    await Promise.all(validationPromises);
    return validPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
};

export { checkApiKey, getRecentGamePlaytimes, getRecentPlaytime, getValidPlayers };
