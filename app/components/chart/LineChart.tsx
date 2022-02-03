import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {LineChart as SvgLineChart, YAxis, Grid} from 'react-native-svg-charts';
import {Circle} from 'react-native-svg';
import theme from '../../theme';

interface LineChartProps {
    data: number[];
    yAxisData?: number[];
    formatLabel?: (value: number) => string;
    style?: ViewStyle | ViewStyle[];
}

const Decorator = ({x, y, data}: any) => {
    return data.map((value, index) => (
        <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={5}
            stroke={theme.COLORS.THEME_SECONDARY}
            fill={theme.COLORS.BACKGROUND_PRIMARY}
        />
    ));
};

function LineChart({
    data,
    yAxisData = [...data, 0],
    formatLabel,
    style
}: LineChartProps) {
    const maxValue = Math.max(...yAxisData);
    const minValue = Math.min(...yAxisData);
    const contentInset = {
        top: 7,
        right: 7,
        bottom: 7,
        left: 7
    };
    return (
        <View style={[styles.container, style]}>
            <YAxis
                data={yAxisData}
                formatLabel={formatLabel}
                contentInset={contentInset}
                numberOfTicks={4}
                max={maxValue}
                min={minValue}
                svg={{
                    fontSize: theme.FONT_SIZE.SECONDARY,
                    fill: theme.COLORS.FONT_SECONDARY
                }}
            />
            <SvgLineChart
                style={styles.chart}
                data={data}
                contentInset={contentInset}
                numberOfTicks={4}
                gridMax={maxValue}
                gridMin={minValue}
                svg={{stroke: theme.COLORS.THEME_SECONDARY}}
            >
                <Decorator />
                <Grid
                    svg={{
                        stroke: theme.COLORS.BACKGROUND_TERTIARY,
                        strokeDasharray: '16,8'
                    }}
                />
            </SvgLineChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 175,
        flexDirection: 'row'
    },
    chart: {
        flex: 1,
        marginLeft: theme.SPACING.S
    }
});

export default LineChart;
