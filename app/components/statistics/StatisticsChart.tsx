import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import SelectionButtons from '../shared/SelectionButtons';
import {useAppDispatch} from '../../redux/store';
import {ChartDataType, ChartTimeInterval} from '../../types/StatisticsOptions';
import {useSelector} from 'react-redux';
import {
    getStatisticsOptions,
    updateStatisticsOptions
} from '../../redux/slices/statisticsOptionsSlice';
import theme from '../../theme';
import StatisticsTimelineChart from './StatisticsTimelineChart';
import {getEntriesFilter} from '../../redux/slices/entriesFilterSlice';
import StatisticsDistributionChart from './StatisticsDistributionChart';

interface StatisticsChartProps {
    entries: Entry[];
}

const chartIntervals = [
    {
        label: '30D',
        value: ChartTimeInterval.DAYS_30
    },
    {
        label: '3M',
        value: ChartTimeInterval.MONTHS_3
    },
    {
        label: '6M',
        value: ChartTimeInterval.MONTHS_6
    }
];

const chartDataTypes = [
    {
        label: 'Distance',
        value: ChartDataType.DISTANCE
    },
    {
        label: 'Duration',
        value: ChartDataType.DURATION
    }
];

function StatisticsChart({entries}: StatisticsChartProps) {
    const dispatch = useAppDispatch();

    const filter = useSelector(getEntriesFilter);
    const statisticsOptions = useSelector(getStatisticsOptions);

    const onChartTimeIntervalChange = (
        chartTimeInterval: ChartTimeInterval
    ) => {
        dispatch(updateStatisticsOptions({chartTimeInterval}));
    };

    const onChartDataTypeChange = (chartDataType: ChartDataType) => {
        dispatch(updateStatisticsOptions({chartDataType}));
    };

    return (
        <View>
            <SelectionButtons
                selected={statisticsOptions.chartDataType}
                items={chartDataTypes}
                style={styles.buttonsRow}
                onChange={onChartDataTypeChange}
            />
            <SelectionButtons
                selected={statisticsOptions.chartTimeInterval}
                items={chartIntervals}
                style={styles.buttonsRow}
                onChange={onChartTimeIntervalChange}
            />
            {filter ? (
                <StatisticsTimelineChart
                    entries={entries}
                    statisticsOptions={statisticsOptions}
                />
            ) : (
                <StatisticsDistributionChart
                    entries={entries}
                    statisticsOptions={statisticsOptions}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsRow: {
        marginBottom: theme.SPACING.S
    }
});

export default StatisticsChart;
