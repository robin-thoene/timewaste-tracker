import { useQuery } from '@tanstack/react-query';

import { IRecentPlayerGameTimes } from '../../types';

/**
 * Query the recent player game times.
 *
 * @param {string} id The internal identifier of the player.
 * @returns {IRecentPlayerGameTimes} The players recent game times.
 */
const useRecentPlayerGameTimes = (id: string) => {
    return useQuery(['recent-player-gametimes', id], async () => {
        try {
            const response = await fetch(`/api/recent-player-gametimes/${id}`);
            const data = (await response.json()) as IRecentPlayerGameTimes;
            data.gameTimes.forEach((gameTime) => {
                gameTime.playtimeInHours = Math.round(gameTime.playtimeInHours);
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    });
};

export default useRecentPlayerGameTimes;
