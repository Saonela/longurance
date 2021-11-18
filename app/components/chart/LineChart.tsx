import React from 'react';
import {Dimensions, StyleProp} from 'react-native';
import {LineChart as LineChartKit} from 'react-native-chart-kit';
import theme from '../../theme';
import {hexToRGB} from '../../lib/utility';

interface LineChartProps {
    labels: string[];
    values: number[];
    highlightedIndexes?: number[];
    width?: number;
    height?: number;
    formatYLabel?: (label: string) => string;
    style?: StyleProp<any>;
}

const chartConfig = {
    backgroundGradientFrom: theme.COLORS.BACKGROUND_BASE,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.COLORS.BACKGROUND_BASE,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => {
        return hexToRGB(theme.COLORS.FONT_PRIMARY, opacity)
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
        r: 6,
    }
};

function LineChart({
                       labels,
                       values,
                       highlightedIndexes = [],
                       width = Dimensions.get("window").width,
                       height = 220,
                       formatYLabel = (label) => label,
                       style = {}
                   }: LineChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                color: (opacity = 1) => hexToRGB(theme.COLORS.FONT_SECONDARY, opacity),
                strokeWidth: 2
            },
        ]
    }

    const getDotColor = (point: number, index: number) => {
        if (highlightedIndexes?.includes(index)) {
            return theme.COLORS.THEME_FONT;
        }
        return theme.COLORS.FONT_SECONDARY;
    }

    return (
        <LineChartKit
            data={chartData}
            width={width}
            height={height}
            chartConfig={chartConfig}
            getDotColor={getDotColor}
            formatYLabel={formatYLabel}
            withDots={true}
            segments={4}
            style={style}
        />
    );
}

export default LineChart;
