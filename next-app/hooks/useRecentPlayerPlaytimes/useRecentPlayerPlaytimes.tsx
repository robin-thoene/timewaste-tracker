import { useQuery } from '@tanstack/react-query';

import { IRecentPlayerPlaytime } from '../../types';

/**
 * Query the recent player playtimes.
 *
 * @returns {IRecentPlayerPlaytime[]} The recent player playtimes.
 */
const useRecentPlayerPlaytimes = () => {
    return useQuery(['recent-player-playtimes'], async () => {
        try {
            const response = await fetch('/api/recent-player-playtimes');
            const data = (await response.json()) as IRecentPlayerPlaytime[];
            data.forEach((d) => {
                d.recentPlaytimeInHours = Math.round(d.recentPlaytimeInHours);
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    });
};

export default useRecentPlayerPlaytimes;
