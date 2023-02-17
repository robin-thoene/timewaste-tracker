import { useQuery } from '@tanstack/react-query';

import { IRecentPlayerGameTimes } from '../../types';

/**
 * Query the recent game times of all players.
 *
 * @returns {IRecentPlayerGameTimes} The players recent game times.
 */
const useRecentPlayerGameTimes = () => {
    return useQuery(['recent-player-gametimes'], async () => {
        try {
            const response = await fetch(`/api/recent-player-gametimes`);
            const data = (await response.json()) as IRecentPlayerGameTimes[];
            // Round everything to hours.
            data?.forEach((recentPlayerGameTimes) => {
                recentPlayerGameTimes.gameTimes?.forEach((gameTime) => {
                    gameTime.playtimeInHours = Math.round(gameTime.playtimeInHours);
                });
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    });
};

export default useRecentPlayerGameTimes;
