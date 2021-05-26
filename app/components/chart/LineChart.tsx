import React from 'react';
import {Dimensions, StyleProp} from 'react-native';
import {LineChart as LineChartKit} from 'react-native-chart-kit';
import theme from '../../theme';
import UtilityService from '../../services/UtilityService';

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
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => {
        return UtilityService.hexToRGB(theme.COLORS.FONT_PRIMARY, opacity)
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
                color: (opacity = 1) => UtilityService.hexToRGB(theme.COLORS.FONT_SECONDARY, opacity),
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
