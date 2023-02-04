import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import PieChart from '../components/base/charts/pieChart';
import useRecentPlayerGameTimes from '../hooks/useRecentPlayerGameTimes';
import useRecentPlayerPlaytimes from '../hooks/useRecentPlayerPlaytimes';

/**
 * The page component to render at "/".
 *
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** Query of the recent player playtimes. */
    const recentPlayerPlaytimes = useRecentPlayerPlaytimes();
    /** Query of the recent game times of all players. */
    const recentGameTimes = useRecentPlayerGameTimes();

    return (
        <div className="flex flex-1 flex-col overflow-auto px-4 sm:px-16">
            <div className="flex pt-36 sm:pt-20">
                <div className="flex h-full min-h-screen w-full flex-col">
                    <h2>{t('recentPlayerPlaytimesHeadline')}</h2>
                    {recentPlayerPlaytimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={recentPlayerPlaytimes.data ?? []} dataKey="recentPlaytimeInHours" withLabels withTooltip nameKey="playerDisplayName" withLegend />
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                {recentGameTimes.data?.map((recentPlayerGameTime, i) => (
                    <div key={`${recentPlayerGameTime.playerDisplayName}-${i}`} className="flex h-full min-h-screen w-full flex-col items-center justify-center">
                        <div className="my-10 w-full border" />
                        <h2>{t('playerRecentGameTimes', { playerName: recentPlayerGameTime.playerDisplayName })}</h2>
                        <PieChart
                            data={recentPlayerGameTime.gameTimes ?? []}
                            dataKey="playtimeInHours"
                            withLabels
                            withTooltip
                            nameKey="gameName"
                            withLegend={recentPlayerGameTime.gameTimes.length <= 20}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Home;
