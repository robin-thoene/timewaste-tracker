import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getRecentGamePlaytimes, getValidPlayers } from '../../helper/steamApiHelper';
import { IRecentPlayerGameTimes } from '../../types';

/**
 * Endpoint to retrieve the total playtime of all games of all players in the last two weeks.
 * @param {NextApiRequest} req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Define const to store all promises to await them later.
    const recentGamePlaytimePromises: Promise<IRecentPlayerGameTimes>[] = [];
    // Get all currently valid players.
    const validPlayers = await getValidPlayers();
    // Store all promises in the array.
    validPlayers.forEach((player) => recentGamePlaytimePromises.push(getRecentGamePlaytimes(player.steamId)));
    // Wait for all promises to resolve.
    const recentGamePlaytimeResponses = await Promise.all(recentGamePlaytimePromises);
    // Return the response.
    res.status(200).json(recentGamePlaytimeResponses);
};

export default handler;
