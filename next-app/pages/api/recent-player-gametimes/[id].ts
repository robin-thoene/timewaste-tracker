import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import playersJson from '../../../data/players.json';
import { getRecentGamePlaytimes } from '../../../helper/steamApiHelper';
import { IPlayer } from '../../../types';

// Convert the JSON to an array of players.
const allPlayers = playersJson as IPlayer[];

/**
 * Endpoint to retrieve the total playtime of all games of the requested player in the last two weeks.
 *
 * @param {NextApiRequest} req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id as string;
    // Validate that the request contains a player id.
    if (!id) {
        res.status(400).json({ error: 'No player id provided.' });
    } else {
        // Verify that the player exists.
        const requestedPlayer = allPlayers.find((player) => player.id === id);
        if (!requestedPlayer) {
            res.status(404).json({ error: 'Player not found.' });
        } else {
            // Get the recently played games for the requested player.
            const recentGamePlaytimes = await getRecentGamePlaytimes(requestedPlayer.steamId);
            res.status(200).json(recentGamePlaytimes);
        }
    }
};

export default handler;
