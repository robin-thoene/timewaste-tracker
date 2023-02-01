import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getRecentPlaytime } from '../../helper/steamApiHelper';
import { IPlayer, IRecentPlayerPlaytime } from '../../types';

// Convert the JSON to an array of players.
const allPlayers = process.env.PLAYERS_JSON ? (JSON.parse(process.env.PLAYERS_JSON) as IPlayer[]) : [];

/**
 * Endpoint to retrieve the total playtime of all players in the last two weeks.
 *
 * @param {NextApiRequest} req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Get the recently played games for each player.
    const recentPlaytimePromises: Promise<IRecentPlayerPlaytime>[] = [];
    // Store all promises in the array.
    allPlayers.forEach((player) => recentPlaytimePromises.push(getRecentPlaytime(player.steamId)));
    // Wait for all promises to resolve.
    const recentPlaytimeResponses = await Promise.all(recentPlaytimePromises);
    // Return the sum.
    res.status(200).json(recentPlaytimeResponses);
};

export default handler;
