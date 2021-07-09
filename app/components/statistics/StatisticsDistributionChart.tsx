import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../theme';
import PieChart from '../chart/PieChart';
import {Entry} from '../../types/Entry';
import {StatisticsOptions} from '../../types/StatisticsOptions';
import StatisticsService from '../../services/StatisticsService';
import {DistributionChartData} from '../../types/DistributionChartData';

interface StatisticsDistributionChartProps {
    entries: Entry[];
    statisticsOptions: StatisticsOptions;
}

function StatisticsDistributionChart({entries, statisticsOptions}: StatisticsDistributionChartProps) {
    const chartWidth = Dimensions.get("window").width - theme.SPACING.M * 2;
    const values: DistributionChartData = StatisticsService.getDistributionChartData(statisticsOptions, entries);

    return (
        <PieChart values={values}
                  width={chartWidth}
                  style={styles.chart}/>
    );
}

const styles = StyleSheet.create({
    chart: {
        marginTop: theme.SPACING.S,
        paddingLeft: theme.SPACING.M
    }
});

export default StatisticsDistributionChart;
