import React from 'react';
import theme from '../../theme';
import {PieChart as PieChartKit} from 'react-native-chart-kit';
import {Dimensions, StyleProp} from 'react-native';

interface PieChartValue {
    name: string;
    value: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

interface PieChartProps {
    values: PieChartValue[];
    width?: number;
    height?: number;
    style?: StyleProp<any>;
}

const chartConfig = {
    color: () => theme.COLORS.FONT_PRIMARY
};

function PieChart({values, width = Dimensions.get("window").width, height = 220, style = {}}: PieChartProps) {
    return (
        <PieChartKit
            data={values}
            width={width}
            height={height}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'0'}
            style={style}
        />
    );
}

export default PieChart;
