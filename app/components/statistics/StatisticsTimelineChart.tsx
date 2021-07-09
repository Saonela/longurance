import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LineChart from '../chart/LineChart';
import StatisticsService from '../../services/StatisticsService';
import {ChartDataType, StatisticsOptions} from '../../types/StatisticsOptions';
import UtilityService from '../../services/UtilityService';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import {TimelineChartData} from '../../types/TimelineChartData';

interface StatisticsTimelineChartProps {
    entries: Entry[];
    statisticsOptions: StatisticsOptions;
}

function StatisticsTimelineChart({entries, statisticsOptions}: StatisticsTimelineChartProps) {
    const chartWidth = Dimensions.get("window").width - theme.SPACING.M * 2;

    let {labels, values}: TimelineChartData = StatisticsService.getTimelineChartData(statisticsOptions, entries);
    if (!labels.length) {
        labels = [''];
    }
    if (!values.length) {
        values = [0];
    }

    let formatYLabel;
    if (statisticsOptions.chartDataType === ChartDataType.DISTANCE) {
        formatYLabel = label => `${parseFloat(label)} Km`;
    }
    if (statisticsOptions.chartDataType === ChartDataType.DURATION) {
        formatYLabel = (label) => UtilityService.getDurationTimeText(label);
    }

    return (
        <LineChart labels={labels}
                   values={values}
                   formatYLabel={formatYLabel}
                   width={chartWidth}
                   style={styles.chart}/>
    );
}

const styles = StyleSheet.create({
    chart: {
        marginTop: theme.SPACING.S,
        paddingLeft: theme.SPACING.M,
    }
});

export default StatisticsTimelineChart;
