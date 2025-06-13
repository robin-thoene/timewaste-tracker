import { Cell, Legend, Pie, PieChart as RPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { IPieChartProps } from './properties';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

const PieChart = (props: IPieChartProps) => {
    const COLORS = useMemo(() => ['#0088FE', '#00C49F', '#FF8042', '#FFBB28'], []);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const match = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(match.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        match.addEventListener('change', handler);
        return () => match.removeEventListener('change', handler);
    }, []);

    /**
     * Callback to render the customized label.
     * @param {{ x: number; y: number; percent: number }} props The properties of the label rendering callback.
     * @returns {ReactElement} The rendered label.
     */
    const renderCustomizedLabel = ({ x, y, percent }: { x: number; y: number; percent: number }): ReactElement => {
        return (
            <text x={x} y={y} fill={isDark ? 'white' : 'black'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)} %`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RPieChart>
                {props.withTooltip && (
                    <Tooltip
                        content={(props) =>
                            props.active && props.payload && props.payload.length ? (
                                <div className="px-2">
                                    <p>{`${props.payload[0].name} : ${props.payload[0].value}`}</p>
                                </div>
                            ) : null
                        }
                    />
                )}
                {props.withLegend && <Legend />}
                <Pie
                    data={props.data}
                    dataKey={props.dataKey}
                    label={props.withLabels ? renderCustomizedLabel : undefined}
                    nameKey={props.nameKey}
                    labelLine={false}
                    innerRadius={'55%'}
                    outerRadius={'75%'}
                >
                    {props.data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </RPieChart>
        </ResponsiveContainer>
    );
};

export default PieChart;
