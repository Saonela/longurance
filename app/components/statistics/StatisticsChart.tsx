import React from 'react';
import {StyleSheet, View} from 'react-native';
import LineChart from '../chart/LineChart';
import {Entry} from '../../types/Entry';
import SelectionButtons from '../shared/SelectionButtons';
import {useAppDispatch} from '../../redux/store';
import {ChartDataType, ChartTimeInterval} from '../../types/StatisticsOptions';
import {useSelector} from 'react-redux';
import {getStatisticsOptions, updateStatisticsOptions} from '../../redux/slices/statisticsOptionsSlice';
import theme from '../../theme';
import StatisticsService from '../../services/StatisticsService';
import UtilityService from '../../services/UtilityService';

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

    const statisticsOptions = useSelector(getStatisticsOptions)

    let {labels, values} = StatisticsService.getEntriesChartData(statisticsOptions, entries);
    let formatYLabel;

    if (statisticsOptions.chartDataType === ChartDataType.DISTANCE) {
        formatYLabel = label => `${parseFloat(label)} Km`;
    }

    if (statisticsOptions.chartDataType === ChartDataType.DURATION) {
        formatYLabel = (label) => UtilityService.getDurationTimeText(label);
    }

    const onChartTimeIntervalChange = (chartTimeInterval: ChartTimeInterval) => {
        dispatch(updateStatisticsOptions({chartTimeInterval}))
    };

    const onChartDataTypeChange = (chartDataType: ChartDataType) => {
        dispatch(updateStatisticsOptions({chartDataType}))
    };

    return (
        <View>
            <SelectionButtons selected={statisticsOptions.chartDataType}
                              items={chartDataTypes}
                              style={styles.buttonsRow}
                              onChange={onChartDataTypeChange}/>
            <SelectionButtons selected={statisticsOptions.chartTimeInterval}
                              items={chartIntervals}
                              style={styles.buttonsRow}
                              onChange={onChartTimeIntervalChange}/>
            <LineChart labels={labels}
                       values={values}
                       formatYLabel={formatYLabel}
                       style={{justifyContent: 'center', alignItems: 'center'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsRow: {
        marginBottom: theme.SPACING.S
    }
});

export default StatisticsChart;
