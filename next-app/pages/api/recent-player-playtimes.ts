import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getRecentPlaytime, getValidPlayers } from '../../helper/steamApiHelper';
import { IRecentPlayerPlaytime } from '../../types';

/**
 * Endpoint to retrieve the total playtime of all players in the last two weeks.
 *
 * @param {NextApiRequest} req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Define const to store all promises to await them later.
    const recentPlaytimePromises: Promise<IRecentPlayerPlaytime>[] = [];
    // Get all currently valid players.
    const validPlayers = await getValidPlayers();
    // Store all promises in the array.
    validPlayers.forEach((player) => recentPlaytimePromises.push(getRecentPlaytime(player.steamId)));
    // Wait for all promises to resolve.
    const recentPlaytimeResponses = await Promise.all(recentPlaytimePromises);
    // Return the response.
    res.status(200).json(recentPlaytimeResponses);
};

export default handler;
