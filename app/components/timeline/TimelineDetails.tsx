import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryTitle, SecondaryHeader, SecondaryText} from '../ui/Text';
import Panel from '../ui/Panel';
import theme from '../../theme';
import {
    calculatePace,
    getCalculatedPaceText,
    getDistanceText,
    getDurationText,
    getEntriesFieldValues,
    getIntensityText,
    getTrophiesLabel,
    getWorkoutsLabel
} from '../../lib/entry';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import LineChart from '../chart/LineChart';
import {TimelineEntry} from '../../types/TimelineEntry';
import {getEntriesByIds, useEntriesStore} from '../../state/entries';
import ChartLegend from '../chart/ChartLegend';
import {TimeInterval} from '../../enums/TimeInterval';
import PercentageLabel from '../ui/PercentageLabel';

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
        color: theme.COLORS.ACCENT
    },
    {
        label: `Previous ${labelsMap[timeInterval]}`,
        color: theme.COLORS.ACCENT_FADED
    }
];

interface TimelineDetailsRowProps {
    label: string;
    formatValue: (value: number, value2?: number) => string;
    currentValue: number;
    previousValue: number | undefined;
    showPercentage?: boolean;
    testID?: string;
}

function TimelineDetailsRow({
    label,
    formatValue,
    currentValue,
    previousValue,
    showPercentage = false,
    testID = ''
}: TimelineDetailsRowProps) {
    return (
        <View
            testID={testID}
            style={[utils.row, utils.justifyBetween, utils.alignEnd]}
        >
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {formatValue(currentValue)}{' '}
                    {showPercentage && !!previousValue && (
                        <PercentageLabel
                            value1={currentValue}
                            value2={previousValue}
                        />
                    )}
                </SecondaryHeader>
                <SecondaryText>{label}</SecondaryText>
            </View>
            {!!previousValue && (
                <View testID="previous-timeline-entry-details">
                    <PrimaryTitle color="secondary" style={[styles.textHeader]}>
                        {formatValue(previousValue)}
                    </PrimaryTitle>
                    <SecondaryText>{label}</SecondaryText>
                </View>
            )}
        </View>
    );
}

function TimelineDetails({
    currentEntry,
    previousEntry,
    timeInterval
}: TimelineDetailsProps) {
    const currentEntries = [
        ...useEntriesStore(getEntriesByIds(currentEntry.entryIds))
    ].reverse();
    const previousEntries = [
        ...useEntriesStore(getEntriesByIds(previousEntry?.entryIds || []))
    ].reverse();

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
            <TimelineDetailsRow
                testID="timeline-entry-distance-details"
                label="Distance"
                formatValue={getDistanceText}
                currentValue={currentEntry.distance}
                previousValue={previousEntry?.distance}
                showPercentage
            />
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
            <TimelineDetailsRow
                testID="timeline-entry-duration-details"
                label="Duration"
                formatValue={getDurationText}
                currentValue={currentEntry.duration}
                previousValue={previousEntry?.duration}
                showPercentage
            />
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
            <TimelineDetailsRow
                label="Avg. Pace"
                formatValue={getCalculatedPaceText}
                currentValue={calculatePace(
                    currentEntry.duration,
                    currentEntry.distance
                )}
                previousValue={calculatePace(
                    previousEntry?.duration || 0,
                    previousEntry?.distance || 0
                )}
            />
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
            <TimelineDetailsRow
                label="Avg. Intensity"
                formatValue={getIntensityText}
                currentValue={currentEntry.effort}
                previousValue={previousEntry?.effort}
            />
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
