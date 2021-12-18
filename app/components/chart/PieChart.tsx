import React from 'react';
import theme from '../../theme';
import {PieChart as PieChartKit} from 'react-native-chart-kit';
import {Dimensions, StyleProp} from 'react-native';
import {DistributionChartData} from '../../types/DistributionChartData';

interface PieChartValue {
    name: string;
    value: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

interface PieChartProps {
    values: DistributionChartData;
    width?: number;
    height?: number;
    style?: StyleProp<any>;
}

const chartConfig = {
    color: () => theme.COLORS.FONT_PRIMARY
};

const COLOR_PALETTE = ['#4b4b4e', '#5d5d60', '#6f6f71'];

function PieChart({
    values,
    width = Dimensions.get('window').width,
    height = 220,
    style = {}
}: PieChartProps) {
    const data: PieChartValue[] = values.map(({label, value}, index) => {
        return {
            name: label,
            value,
            color: COLOR_PALETTE[index],
            legendFontColor: theme.COLORS.FONT_PRIMARY,
            legendFontSize: theme.FONT_SIZE.PRIMARY
        };
    });

    return (
        <PieChartKit
            data={data}
            width={width}
            height={height}
            chartConfig={chartConfig}
            accessor={'value'}
            backgroundColor={'transparent'}
            paddingLeft={theme.SPACING.M.toString()}
            center={[0, -theme.SPACING.M]}
            style={style}
        />
    );
}

export default PieChart;
