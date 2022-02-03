import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import Panel from '../ui/Panel';
import theme from '../../theme';
import {
    getCalculatedPaceText,
    getDistanceText,
    getDurationText,
    getEntriesFieldValues,
    getIntensityText,
    getPaceText,
    getTrophiesLabel,
    getWorkoutsLabel
} from '../../lib/entry';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import LineChart from '../chart/LineChart';
import {TimelineEntry} from '../../types/TimelineEntry';
import {getEntriesByIds, useEntriesStore} from '../../state/entries';
import ChartLegend from '../chart/ChartLegend';
import {TimeInterval} from '../../types/TimeInterval';

interface TimelineDetailsProps {
    currentEntry: TimelineEntry;
    previousEntry: TimelineEntry | null;
    timeInterval: TimeInterval.YEAR | TimeInterval.MONTH;
}

const labelsMap = {
    [TimeInterval.YEAR]: 'year',
    [TimeInterval.MONTH]: 'month'
};

const getLegendItems = (timeInterval: TimeInterval) => [
    {
        label: `Current ${labelsMap[timeInterval]}`,
        color: theme.COLORS.THEME_SECONDARY
    },
    {
        label: `Previous ${labelsMap[timeInterval]}`,
        color: theme.COLORS.THEME_SECONDARY_FADED
    }
];

function TimelineDetails({
    currentEntry,
    previousEntry,
    timeInterval
}: TimelineDetailsProps) {
    const currentEntries = useEntriesStore(
        getEntriesByIds(currentEntry.entryIds)
    );
    const previousEntries = useEntriesStore(
        getEntriesByIds(previousEntry?.entryIds || [])
    );
    const currentPoints = getEntriesFieldValues(currentEntries);
    const previousPoints = getEntriesFieldValues(previousEntries);
    return (
        <Panel>
            <SecondaryHeader color="secondary" style={[utils.marginBottomXL]}>
                {currentEntry.title}
            </SecondaryHeader>
            <View style={utils.row}>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {currentEntry.entryIds.length}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getWorkoutsLabel(currentEntry.entryIds.length)}
                    </SecondaryText>
                </View>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {currentEntry.trophiesCount}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getTrophiesLabel(currentEntry.trophiesCount)}
                    </SecondaryText>
                </View>
            </View>
            {previousEntry !== undefined && (
                <>
                    <Separator />
                    <ChartLegend items={getLegendItems(timeInterval)} />
                </>
            )}
            <Separator marginBottom={theme.SPACING.L} />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDistanceText(currentEntry.distance)}
                </SecondaryHeader>
                <SecondaryText>Distance</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={currentPoints.distance}
                secondaryData={previousPoints.distance}
                formatLabel={getDistanceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDurationText(currentEntry.duration)}
                </SecondaryHeader>
                <SecondaryText>Duration</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={currentPoints.duration}
                secondaryData={previousPoints.duration}
                formatLabel={getDurationText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getPaceText(currentEntry.duration, currentEntry.distance)}
                </SecondaryHeader>
                <SecondaryText>Avg. Pace</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={currentPoints.pace}
                secondaryData={previousPoints.pace}
                formatLabel={getCalculatedPaceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getIntensityText(currentEntry.effort)}
                </SecondaryHeader>
                <SecondaryText>Avg. Intensity</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={currentPoints.intensity}
                secondaryData={previousPoints.intensity}
                yAxisData={[1, 2, 3, 4, 5]}
                formatLabel={getIntensityText}
            />
        </Panel>
    );
}

const styles = StyleSheet.create({
    chart: {
        marginTop: theme.SPACING.L,
        marginBottom: theme.SPACING.S
    },
    textHeader: {
        paddingBottom: theme.SPACING.XS
    }
});

export default TimelineDetails;
