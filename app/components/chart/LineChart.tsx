import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {LineChart as SvgLineChart, YAxis, Grid} from 'react-native-svg-charts';
import {Circle} from 'react-native-svg';
import theme from '../../theme';

interface LineChartProps {
    data: number[];
    secondaryData?: number[];
    yAxisData?: number[];
    formatLabel?: (value: number) => string;
    style?: ViewStyle | ViewStyle[];
}

const Decorator = ({x, y, data}: any) => {
    return data.map((dataset, datasetIndex) =>
        dataset.data.map((value, index) => (
            <Circle
                key={index}
                cx={x(index)}
                cy={y(value)}
                r={5}
                stroke={
                    datasetIndex === 1
                        ? theme.COLORS.ACCENT
                        : theme.COLORS.ACCENT_FADED
                }
                fill={theme.COLORS.BACKGROUND_PRIMARY}
            />
        ))
    );
};

function LineChart({
    data = [],
    secondaryData = [],
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

    const datasets = [
        {
            data: secondaryData,
            svg: {stroke: theme.COLORS.ACCENT_FADED}
        },
        {
            data,
            svg: {stroke: theme.COLORS.ACCENT}
        }
    ];

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
                data={datasets}
                contentInset={contentInset}
                numberOfTicks={4}
                gridMax={maxValue}
                gridMin={minValue}
                svg={{stroke: theme.COLORS.ACCENT}}
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
