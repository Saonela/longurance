// eslint-disable-next-line import/no-extraneous-dependencies
import * as shape from 'd3-shape';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import theme from '../../theme';
import utils from '../../styles-utilities';

interface MinimalLineChartProps {
    data: number[];
    style?: ViewStyle | ViewStyle[];
}

function MinimalLineChart({data, style}: MinimalLineChartProps) {
    return (
        <View style={[utils.flex1, style]}>
            <LineChart
                style={{flex: 1}}
                data={data}
                svg={{strokeWidth: 2, stroke: theme.COLORS.THEME_SECONDARY}}
                curve={shape.curveNatural}
                contentInset={{top: 7, bottom: 7}}
            />
        </View>
    );
}

export default MinimalLineChart;
