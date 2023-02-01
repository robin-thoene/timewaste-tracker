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
    /** Query of the recent game times of the first player. */
    const firstPlayerRecentGameTimes = useRecentPlayerGameTimes('1');
    /** Query of the recent game times of the second player. */
    const secondPlayerRecentGameTimes = useRecentPlayerGameTimes('2');
    /** Query of the recent game times of the third player. */
    const thirdPlayerRecentGameTimes = useRecentPlayerGameTimes('3');
    /** Query of the recent game times of the forth player. */
    const forthPlayerRecentGameTimes = useRecentPlayerGameTimes('4');
    /** Query of the recent game times of the fifth player. */
    const fifthPlayerRecentGameTimes = useRecentPlayerGameTimes('5');
    /** Query of the recent game times of the sixth player. */
    const sixthPlayerRecentGameTimes = useRecentPlayerGameTimes('6');

    return (
        <div className="flex flex-1 flex-col overflow-auto">
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('recentPlayerPlaytimesHeadline')}</h2>
                    {recentPlayerPlaytimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={recentPlayerPlaytimes.data ?? []} dataKey="recentPlaytimeInHours" withLabels withTooltip withLegend nameKey="playerDisplayName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: firstPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {firstPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={firstPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: secondPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {secondPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={secondPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: thirdPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {thirdPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={thirdPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: forthPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {forthPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={forthPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: fifthPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {fifthPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={fifthPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
            </div>
            <div className="flex p-16">
                <div className="flex h-screen w-full flex-col">
                    <h2>{t('playerRecentGameTimes', { playerName: sixthPlayerRecentGameTimes.data?.playerDisplayName })}</h2>
                    {sixthPlayerRecentGameTimes.isLoading ? (
                        'loading ...'
                    ) : (
                        <PieChart data={sixthPlayerRecentGameTimes.data?.gameTimes ?? []} dataKey="playtimeInHours" withLabels withTooltip withLegend nameKey="gameName" />
                    )}
                </div>
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
