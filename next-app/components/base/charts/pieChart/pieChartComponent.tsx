import { Cell, Legend, Pie, PieChart as RPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { IPieChartProps } from './properties';
import React, { useEffect, useMemo } from 'react';

const PieChart = (props: IPieChartProps) => {
    const COLORS = useMemo(() => ['#0088FE', '#00C49F', '#FF8042', '#FFBB28'], []);

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
                <Pie data={props.data} dataKey={props.dataKey} nameKey={props.nameKey} innerRadius={'55%'} outerRadius={'75%'}>
                    {props.data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </RPieChart>
        </ResponsiveContainer>
    );
};

export default PieChart;
