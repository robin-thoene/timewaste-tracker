import { Cell, Legend, Pie, PieLabelRenderProps, PieChart as RPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { IPieChartProps } from './properties';
import React, { useEffect, useMemo, useState } from 'react';

const RADIAN = Math.PI / 180;

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

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
        // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
            <text x={x} y={y} fill={isDark ? 'white' : 'black'} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {/* @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380 */}
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
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
